import assert from "assert";
import {
    Color,
    getOppositeColor,
    Move,
    Pawn,
    Piece,
    Position,
    Type,
} from "model";
import {Opponent} from "model/Opponent";

/**
 * Callback called on chessboard update
 */
type UpdateCallback = () => void;

/**
 * Chessboard
 */
class Chessboard {
    /**
     * Number of rows
     * @type {number}
     */
    public readonly NB_ROWS = 8;

    /**
     * Number of columns
     * @type {number}
     */
    public readonly NB_COLS = 8;

    /**
     * Board per se
     * @type {(Piece | null)[][]}
     * @private
     */
    private readonly _board: (Piece | null)[][];

    /**
     * Map of all the pieces
     * @type {{[p: Color | string]: Piece[]}}
     * @private
     */
    private readonly _pieces: { [c: Color | string]: Piece[] };

    /**
     * Castling allowed for each color and each side (Queen and King side)
     * @type {{[p: Color | string]: {[p: string | type]: boolean}}}
     * @private
     */
    private readonly _castlingAllowed: { [c: Color | string]: { [s: string | Type]: boolean } };

    /**
     * Current active color
     * @type {Color}
     * @private
     */
    private _activeColor: Color;

    /**
     * List of opponents
     * @type {Opponent[]}
     * @private
     */
    private readonly _opponents: Opponent[];

    /**
     * Index of the current opponent
     * @type {number}
     * @private
     */
    private _currentOpponentIndex: number;

    /**
     * Callbacks when the board is updated
     * @type {UpdateCallback[]}
     * @private
     */
    private readonly _updateCallbacks: UpdateCallback[];

    /**
     * Constructor
     * @param {string} FEN FEN initializer
     * @see https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation FEN on Wikipedia
     */
    public constructor(FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") {
        this._board           = [];
        this._pieces          = {
            [Color.Black]: [],
            [Color.White]: [],
        };
        this._castlingAllowed = {};

        this._activeColor          = Color.White;
        this._opponents            = [];
        this._currentOpponentIndex = -1;

        this._updateCallbacks = [];

        for (let row = 0; row < this.NB_ROWS; ++row) {
            const currentRow = [] as null[];

            for (let col = 0; col < this.NB_COLS; ++col) {
                currentRow.push(null);
            }

            this._board.push(currentRow);
        }

        this._initializeFromFEN(FEN);
    }

    /**
     * @returns {Color} Active color
     */
    public get activeColor(): Color {
        return this._activeColor;
    }

    /**
     * @returns {Opponent} Player, in a PvE match
     */
    public get player(): Opponent {
        return this._opponents[0];
    }

    /**
     * @returns {Opponent} Opponent, in a PvE match
     */
    public get opponent(): Opponent {
        return this._opponents[1];
    }

    /**
     * Try a move
     * @param {Move} move Move to try
     * @param {(board: Chessboard) => void} tryFunction Code to execute during the move context
     */
    public tryMove(move: Move, tryFunction: (board: Chessboard) => void): void {
        // FIXME: This function is definitely not thread-safe

        // Save state

        const pieceTaken             = this.getPiece(move.position);
        const oldParentPiecePosition = move.parentPiece.position;

        const oldMovedState = move.parentPiece.hasMoved;

        const oldCastlingRookPosition   = move.castlingRook?.position;
        const oldCastlingRookMovedState = move.castlingRook?.hasMoved;

        let pieceTakenIndex = pieceTaken === null ? -1 : this._pieces[pieceTaken.color].indexOf(pieceTaken);

        // Try to play

        this._playMove(move, false);
        tryFunction(this);

        // Revert state

        if (move.isCastling) {
            assert(move.castlingRook !== null);
            assert(move.castlingRookPosition !== null);
            assert(oldCastlingRookPosition !== null);
            assert(oldCastlingRookPosition instanceof Position);
            assert(typeof oldCastlingRookMovedState === "boolean");

            move.castlingRook.revertMoved(oldCastlingRookMovedState);
            move.castlingRook.setNewPosition(oldCastlingRookPosition);
            this._setPiece(move.castlingRookPosition, null);
            this._setPiece(move.castlingRook.position, move.castlingRook);
        }

        this._activeColor = getOppositeColor(this._activeColor);

        move.parentPiece.revertMoved(oldMovedState);
        move.parentPiece.setNewPosition(oldParentPiecePosition);
        this._setPiece(move.position, pieceTaken);
        this._setPiece(move.parentPiece.position, move.parentPiece);

        if (move.pieceTaken) {
            assert(pieceTaken !== null);
            this._pieces[pieceTaken.color].splice(pieceTakenIndex, 0, pieceTaken);
        }

        if (move.isPromotion) {
            assert(!(move.parentPiece instanceof Pawn));
            assert(move.promotionNewType !== null);
            this._replacePiece(move, Type.Pawn);
        }
    }

    /**
     * Start the game
     * @param {boolean} waitForPlayer Set to false for benchmarks
     * @returns {Promise<void>}
     */
    public async start(waitForPlayer = true): Promise<void> {
        let moveAvailable = true;

        while (moveAvailable) {
            const move = await this._opponents[this._currentOpponentIndex].getMoveToPlay(waitForPlayer);

            if (move === null) {
                moveAvailable = false;
            } else {
                this._playMove(move);
                this._currentOpponentIndex = (this._currentOpponentIndex + 1) % 2;
            }
        }

        console.info("No more available moves");
    }

    /**
     * Add an update callback
     * @param {UpdateCallback} callback Callback
     */
    public addUpdateListener(callback: UpdateCallback): void {
        this._updateCallbacks.push(callback);
    }

    /**
     * Sets the first opponent
     * @param {Opponent} opp Opponent
     * @param {Color | null} forcedColor Forced color
     */
    public setFirstOpponent(opp: Opponent, forcedColor: Color | null = null): void {
        this._setOpponent(opp, 0, forcedColor);
    }

    /**
     * Sets the second opponent
     * @param {Opponent} opp Opponent
     * @param {Color | null} forcedColor Forced color
     */
    public setSecondOpponent(opp: Opponent, forcedColor: Color | null = null): void {
        this._setOpponent(opp, 1, forcedColor);
    }

    /**
     * @returns {Piece[]} List of all the pieces
     */
    public getAllPieces(): Piece[] {
        return this._pieces[Color.Black].concat(this._pieces[Color.White]);
    }

    /**
     * @param {Color} color Pieces color
     * @returns {Piece[]} List of all the pieces in a specific color
     */
    public getPieces(color: Color): Piece[] {
        return this._pieces[color];
    }

    /**
     * @param {Position} position Position
     * @returns {Piece | null} Single piece at a position
     */
    public getPiece(position: Position): Piece | null {
        if (!this.isValidPosition(position)) {
            throw new Error(`Invalid position: ${position}`);
        }

        return this._board[position.row][position.col];
    }

    /**
     * @param {Position} position Position to check
     * @returns {boolean} Valid position or not
     */
    public isValidPosition(position: Position): boolean {
        return position.row >= 0 && position.row < this.NB_ROWS && position.col >= 0 && position.col < this.NB_COLS;
    }

    /**
     * @param {Color} color Color
     * @param {Type} side Side (Queen or King)
     * @returns {boolean} Castling allowed on a specific color + side
     */
    public castlingAllowed(color: Color, side: Type): boolean {
        assert(side === Type.Queen || side === Type.King);
        return this._castlingAllowed[color][side];
    }

    private _replacePiece(move: Move, newType: Type): void {
        const promotedPiece = Piece.clone(move.parentPiece, newType);
        let replaced        = false;

        for (let i = 0; i < this._pieces[move.parentPiece.color].length; ++i) {
            if (move.parentPiece.equals(this._pieces[move.parentPiece.color][i])) {
                this._pieces[move.parentPiece.color][i] = promotedPiece;
                replaced                                = true;
                break;
            }
        }

        assert(replaced, "A promoted piece has not been replaced");

        this._setPiece(move.parentPiece.position, promotedPiece);
        move.replaceParentPiece(promotedPiece);
    }

    /**
     * Plays a move
     * @param {Move} move Move to play
     * @param {boolean} notifyUpdate Notify an update to the listeners
     * @private
     */
    private _playMove(move: Move, notifyUpdate = true): void {
        if (move.isPromotion) {
            // We shouldn't only change the piece `type` attribute, because we would have an inconsistent model
            assert(move.promotionNewType !== null);
            assert(move.parentPiece instanceof Pawn);
            this._replacePiece(move, move.promotionNewType);
        }

        assert(move.pieceTaken !== (this.getPiece(move.position) === null));

        if (move.pieceTaken) {
            // Remove the piece from the internal list of all available pieces
            const p = this.getPiece(move.position);
            assert(p !== null);
            for (let i = 0; i < this._pieces[p.color].length; ++i) {
                if (p.equals(this._pieces[p.color][i])) {
                    this._pieces[p.color].splice(i, 1);
                    break;
                }
            }
        }

        this._setPiece(move.parentPiece.position, null);
        this._setPiece(move.position, move.parentPiece);
        move.parentPiece.setNewPosition(move.position);
        move.parentPiece.setMoved();

        if (move.isCastling) {
            assert(move.castlingRook !== null);
            assert(move.castlingRookPosition !== null);

            this._setPiece(move.castlingRook.position, null);
            this._setPiece(move.castlingRookPosition, move.castlingRook);
            move.castlingRook.setNewPosition(move.castlingRookPosition);
            move.castlingRook.setMoved();
        }

        this._activeColor = getOppositeColor(this._activeColor);

        if (notifyUpdate) {
            for (const callback of this._updateCallbacks) {
                callback();
            }
        }
    }

    /**
     * Internal function to set the opponents
     * @param {Opponent} opp Opponent
     * @param {number} ownIndex Index in the opponent array
     * @param {Color | null} forcedColor Forced color
     * @private
     */
    private _setOpponent(opp: Opponent, ownIndex: number, forcedColor: Color | null): void {
        const otherIndex = ownIndex ^ 1;

        this._opponents[ownIndex] = opp;

        let color = Math.random() > 0.5 ? Color.White : Color.Black;

        if (forcedColor !== null) {
            color = forcedColor;
        }

        if (this._opponents[otherIndex]) {
            color = getOppositeColor(this._opponents[otherIndex].ownColor);
        }

        if (color === Color.White) {
            this._currentOpponentIndex = ownIndex;
        }

        opp.setOwnColor(color);
    }

    /**
     * Initialize the board from a FEN initializer
     * @param {string} strFEN FEN
     * @private
     */
    private _initializeFromFEN(strFEN: string): void {
        const FEN = strFEN.trim().split(" ");

        if (FEN.length === 4) {
            FEN.push("0");
        }

        if (FEN.length === 5) {
            FEN.push("0");
        }

        assert(FEN.length === 6, "Invalid FEN length");

        const rowsFEN = FEN[0].split("/");
        assert(rowsFEN.length === this.NB_ROWS, "Invalid FEN pieces length");

        // Set the pieces
        for (let row = 0; row < this.NB_ROWS; ++row) {
            let col = 0;
            for (const char of rowsFEN[this.NB_ROWS - row - 1]) {
                if (/[0-9]/.test(char)) {
                    col += Number(char);
                } else {
                    const p = Piece.createFromFEN(char, this, new Position(row, col));
                    this._setPiece(new Position(row, col), p);
                    this._pieces[p.color].push(p);
                    ++col;
                }
            }
        }

        // Active color
        if (FEN[1] === "b") {
            this._activeColor = Color.Black;
        } else if (FEN[1] === "w") {
            this._activeColor = Color.White;
        } else {
            throw new Error("Invalid FEN active color");
        }

        // Castling
        this._castlingAllowed[Color.White] = {
            [Type.King]: FEN[2].includes("K"),
            [Type.Queen]: FEN[2].includes("Q"),
        };

        this._castlingAllowed[Color.Black] = {
            [Type.Queen]: FEN[2].includes("q"),
            [Type.King]: FEN[2].includes("k"),
        };
    }

    /**
     * Set a piece
     * @param {Position} position Position
     * @param {Piece | null} piece New piece
     * @private
     */
    private _setPiece(position: Position, piece: Piece | null): void {
        this._board[position.row][position.col] = piece;
    }
}

export {Chessboard};
