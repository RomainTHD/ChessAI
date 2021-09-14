import assert from "assert";
import {
    Color,
    Piece,
    Position,
} from "model";

class Chessboard {
    public readonly NB_ROWS = 8;
    public readonly NB_COLS = 8;
    private readonly _board: (Piece | null)[][];

    public constructor(FEN: string = "") {
        this._board = [];

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

    // @ts-ignore
    private _activeColor: Color;

    public get activeColor(): Color {
        return this._activeColor;
    }

    public getPiece(position: Position): Piece | null {
        return this._board[position.row][position.col];
    }

    public isValidPosition(position: Position): boolean {
        return position.row >= 0 && position.row < this.NB_ROWS && position.col >= 0 && position.col < this.NB_COLS;
    }

    private _initializeFromFEN(FENstr: string) {
        const FEN = FENstr.split(" ");
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
