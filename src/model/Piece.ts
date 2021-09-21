import assert from "assert";
import {
    Bishop,
    Chessboard,
    Color,
    getOppositeColor,
    King,
    Knight,
    Move,
    Pawn,
    Position,
    Queen,
    Rook,
    Type,
    typeToFEN,
} from "model";

/**
 * Move result
 */
enum MoveResult {
    /**
     * Piece moved on an empty spot
     * @type {MoveResult.Occupied}
     */
    Occupied,

    /**
     * Piece moved on a previously occupied spot
     * @type {MoveResult.Taken}
     */
    Taken,

    /**
     * Move out of bounds
     * @type {MoveResult.OutOfBounds}
     */
    OutOfBounds,

    /**
     * Move on the same color as the piece
     * @type {MoveResult.OwnColor}
     */
    OwnColor,
}

/**
 * Piece
 */
abstract class Piece {
    /**
     * Piece type
     * @type {Type}
     */
    public abstract readonly type: Type;

    /**
     * Parent board
     * @type {Chessboard}
     */
    public readonly board: Chessboard;

    /**
     * Own color
     * @type {Color}
     */
    public readonly color: Color;

    /**
     * Own position
     * @type {Position}
     * @private
     */
    private _position: Position;

    /**
     * Has moved at least once during the game
     * @type {boolean}
     * @private
     */
    private _hasMoved: boolean;

    /**
     * Constructor
     * @param {Chessboard} board Parent board
     * @param {Color} color Own color
     * @param {Position} position Own position
     */
    public constructor(board: Chessboard, color: Color, position: Position) {
        this.board     = board;
        this.color     = color;
        this._position = position;
        this._hasMoved = false;
    }

    public static clone(piece: Piece, newType: Type | null = null): Piece {
        if (newType === null) {
            newType = piece.type;
        }

        const clone = this.createFromFEN(typeToFEN(newType, piece.color), piece.board, piece.position);
        clone.setMoved();

        return clone;
    }

    /**
     * @returns {boolean} Has already moved once
     */
    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    /**
     * @returns {Position} Own position
     */
    public get position(): Position {
        return this._position;
    }

    /**
     * Create a piece from a FEN character
     * @param {string} FEN FEN character
     * @param {Chessboard} board Board used
     * @param {Position} position Position
     * @returns {Piece}
     */
    public static createFromFEN(FEN: string, board: Chessboard, position: Position): Piece {
        assert(/[bknpqr]/i.test(FEN), "Wrong FEN");

        const color = /[bknpqr]/.test(FEN) ? Color.Black : Color.White;
        let piece: Piece;

        switch (FEN.toLowerCase()) {
            case "b":
                piece = new Bishop(board, color, position);
                break;

            case "k":
                piece = new King(board, color, position);
                break;

            case "n":
                piece = new Knight(board, color, position);
                break;

            case "p":
                piece = new Pawn(board, color, position);
                break;

            case "q":
                piece = new Queen(board, color, position);
                break;

            case "r":
                piece = new Rook(board, color, position);
                break;

            default:
                throw new Error("Unknown FEN value");
        }

        return piece;
    }

    /**
     * Set the piece as moved
     */
    public setMoved(): void {
        this._hasMoved = true;
    }

    /**
     * Revert the "moved" field
     * @param {boolean} oldMovedValue Previous value
     */
    public revertMoved(oldMovedValue: boolean): void {
        this._hasMoved = oldMovedValue;
    }

    /**
     * @returns {string} FEN character of the current piece
     */
    public getFEN(): string {
        return typeToFEN(this.type, this.color);
    }

    /**
     * List all the pseudo-legal moves, aka even the check moves
     * @returns {Move[]} All pseudo-legal moves
     */
    public abstract getPseudoLegalMoves(): Move[];

    /**
     * List all the legal moves
     * @returns {Move[]} All legal moves
     */
    public getLegalMoves(): Move[] {
        const pseudoLegalMoves = this.getPseudoLegalMoves();
        const legalMoves       = [] as Move[];

        for (const pseudoLegalMove of pseudoLegalMoves) {
            // Try each pseudo-legal move
            this.board.tryMove(pseudoLegalMove, (board: Chessboard) => {
                let legalMove = true;

                for (const opponentPiece of board.getPieces(getOppositeColor(this.color))) {
                    // For each opponent piece, we check if a move can take the king
                    const opponentMoves = opponentPiece.getPseudoLegalMoves();
                    for (const opponentMove of opponentMoves) {
                        // eslint-disable-next-line
                        board.tryMove(opponentMove, (nextBoard: Chessboard) => {
                            let kingStillAlive    = false;
                            const remainingPieces = nextBoard.getPieces(this.color);
                            for (const remainingPiece of remainingPieces) {
                                if (remainingPiece.type === Type.King) {
                                    // Even after this move, our king is still alive
                                    kingStillAlive = true;
                                    break;
                                }
                            }

                            if (!kingStillAlive) {
                                // After Opponent#1's move there's no king left, so Opponent#0's move is not legal
                                legalMove = false;
                            }
                        });

                        if (!legalMove) {
                            break;
                        }
                    }

                    if (!legalMove) {
                        break;
                    }
                }

                if (legalMove) {
                    legalMoves.push(pseudoLegalMove);
                }
            });
        }

        return legalMoves;
    }

    /**
     * @param {Position} newPos New position to set
     */
    public setNewPosition(newPos: Position): void {
        this._position = newPos;
    }

    /**
     * Add a move if available to a list of available moves.
     * Used to generate the pseudo-legal moves and avoid duplicated code
     * @param {Position} position Position
     * @param {Move[]} moves Output array, a move may be added into it
     * @returns {MoveResult} Result of this
     * @protected
     */
    protected _addMoveIfAvailable(position: Position, moves: Move[]): MoveResult {
        if (this.board.isValidPosition(position)) {
            const target = this.board.getPiece(position);
            if (target === null) {
                moves.push(Move.fromPosition(this, position));
                return MoveResult.Occupied;
            } else if (target.color !== this.color) {
                moves.push(Move.fromPosition(this, position, true));
                return MoveResult.Taken;
            } else {
                return MoveResult.OwnColor;
            }
        } else {
            return MoveResult.OutOfBounds;
        }
    }

    /**
     * Add several moves in a straight line to a list of available moves
     * @param {Position} direction Direction
     * @param {Move[]} moves Output array, several moves may be added into it
     * @param {number} limit Limit
     * @protected
     */
    protected _checkStraightLines(direction: Position, moves: Move[], limit = Infinity): void {
        let i   = 1;
        let res = MoveResult.Occupied;
        while (i <= limit && res === MoveResult.Occupied) {
            const p = this.position.add(new Position(i * direction.row, i * direction.col));
            res     = this._addMoveIfAvailable(p, moves);
            ++i;
        }
    }
}

export {
    Piece,
    MoveResult,
};
