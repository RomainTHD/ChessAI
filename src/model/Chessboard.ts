import assert from "assert";
import {
    Color,
    Move,
    Piece,
    Position,
} from "model";

class Chessboard {
    public readonly NB_ROWS = 8;
    public readonly NB_COLS = 8;
    private readonly _board: (Piece | null)[][];
    private readonly _blackPieces: Piece[];
    private readonly _whitePieces: Piece[];

    public constructor(FEN: string = "") {
        this._board       = [];
        this._blackPieces = [];
        this._whitePieces = [];
        this._activeColor = Color.White;

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

        this._initializeFromFEN(FEN);
    }

    private _activeColor: Color;

    public get activeColor(): Color {
        return this._activeColor;
    }

    public playMove(move: Move): void {
        this._board[move.parentPiece.row][move.parentPiece.col] = null;
        this._board[move.row][move.col]                         = move.parentPiece;
        move.parentPiece.setNewPosition(move.position);
        this._activeColor = (this._activeColor === Color.White) ? Color.Black : Color.White;
    }

    public getAllPieces(): Piece[] {
        return this._blackPieces.concat(this._whitePieces);
    }

    public getBlackPieces(): Piece[] {
        return this._blackPieces;
    }

    public getWhitePieces(): Piece[] {
        return this._whitePieces;
    }

    public getPiece(position: Position): Piece | null {
        return this._board[position.row][position.col];
    }

    public isValidPosition(position: Position): boolean {
        return position.row >= 0 && position.row < this.NB_ROWS && position.col >= 0 && position.col < this.NB_COLS;
    }

    private _initializeFromFEN(strFEN: string): void {
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
                    this._board[row][col] = Piece.createFromFEN(c, this, new Position(row, col));
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
    }
}

export {Chessboard};
