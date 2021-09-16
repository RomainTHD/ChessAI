import assert from "assert";
import {
    Color,
    Move,
    Piece,
    Position,
    Type,
} from "model";
import {
    Opponent,
    OpponentSpecs,
} from "model/Opponent/index";

class Chessboard {
    public readonly NB_ROWS = 8;
    public readonly NB_COLS = 8;
    private readonly _board: (Piece | null)[][];
    private readonly _pieces: { [c: Color | string]: Piece[] };
    private readonly _castlingAllowed: { [c: Color | string]: { [s: string]: boolean } };
    private _activeColor: Color;
    private _opponent: Opponent | null;

    public constructor(FEN: string = "", opponentClass: OpponentSpecs | null) {
        this._board           = [];
        this._pieces          = {
            [Color.Black]: [],
            [Color.White]: [],
        };
        this._castlingAllowed = {};
        this._activeColor     = Color.White;
        this._opponent        = null;

        for (let row = 0; row < this.NB_ROWS; ++row) {
            const currentRow = [] as null[];

            for (let col = 0; col < this.NB_COLS; ++col) {
                currentRow.push(null);
            }

            this._board.push(currentRow);
        }

        if (FEN === "") {
            FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        }

        this._initializeFromFEN(FEN, opponentClass);
    }

    public get opponent(): Opponent | null {
        return this._opponent;
    }

    public get activeColor(): Color {
        return this._activeColor;
    }

    public playMove(move: Move): void {
        assert(move.pieceTaken !== (this.getPiece(move.position) === null));

        if (move.pieceTaken) {
            const p = this.getPiece(move.position);
            assert(p !== null);
            for (let i = 0; i < this._pieces[p.color].length; ++i) {
                if (p === this._pieces[p.color][i]) {
                    this._pieces[p.color].splice(i, 1);
                    break;
                }
            }
        }

        this._board[move.parentPiece.row][move.parentPiece.col] = null;
        this._board[move.row][move.col]                         = move.parentPiece;
        move.parentPiece.setNewPosition(move.position);
        move.parentPiece.setMoved();

        if (move.isCastling) {
            assert(move.castlingRook !== null);
            assert(move.castlingRookPosition !== null);

            this._board[move.castlingRook.row][move.castlingRook.col]                 = null;
            this._board[move.castlingRookPosition.row][move.castlingRookPosition.col] = move.castlingRook;
            move.castlingRook.setNewPosition(move.castlingRookPosition);
            move.castlingRook.setMoved();
        }

        this._activeColor = (this._activeColor === Color.White) ? Color.Black : Color.White;
    }

    public getAllPieces(): Piece[] {
        return this._pieces[Color.Black].concat(this._pieces[Color.White]);
    }

    public getPieces(color: Color): Piece[] {
        return this._pieces[color];
    }

    public getPiece(position: Position): Piece | null {
        return this._board[position.row][position.col];
    }

    public isValidPosition(position: Position): boolean {
        return position.row >= 0 && position.row < this.NB_ROWS && position.col >= 0 && position.col < this.NB_COLS;
    }

    public castlingAllowed(color: Color, side: Type): boolean {
        return this._castlingAllowed[color][side.name];
    }

    private _initializeFromFEN(strFEN: string, opponentClass: OpponentSpecs | null): void {
        const FEN = strFEN.split(" ");

        if (FEN.length === 4) {
            FEN.push("0");
        }

        if (FEN.length === 5) {
            FEN.push("0");
        }

        assert(FEN.length === 6, "Invalid FEN length");

        const rowsFEN = FEN[0].split("/");
        assert(rowsFEN.length === this.NB_ROWS, "Invalid FEN pieces length");

        for (let row = 0; row < this.NB_ROWS; ++row) {
            let col = 0;
            for (let c of rowsFEN[row]) {
                if (/[0-9]/.test(c)) {
                    col += parseInt(c);
                } else {
                    const p               = Piece.createFromFEN(c, this, new Position(row, col));
                    this._board[row][col] = p;
                    this._pieces[p.color].push(p);
                    ++col;
                }
            }
        }

        if (FEN[1] === "b") {
            this._activeColor = Color.Black;
        } else if (FEN[1] === "w") {
            this._activeColor = Color.White;
        } else {
            throw new Error("Invalid FEN active color");
        }

        if (opponentClass !== null) {
            // TODO: Alternate colors
            this._opponent = new opponentClass(Color.Black, this);
        }

        this._castlingAllowed[Color.White] = {
            [Type.King.name]: FEN[2].includes("K"),
            [Type.Queen.name]: FEN[2].includes("Q"),
        };

        this._castlingAllowed[Color.Black] = {
            [Type.Queen.name]: FEN[2].includes("q"),
            [Type.King.name]: FEN[2].includes("k"),
        };
    }
}

export {Chessboard};
