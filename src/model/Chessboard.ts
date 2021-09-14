import assert from "assert";
import {
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

        this._fillFromFEN(FEN);
    }

    public getPiece(row: number, col: number): Piece | null {
        return this._board[row][col];
    }

    private _fillFromFEN(FEN: string) {
        const subFEN = FEN.split(" ");
        assert(subFEN.length === 6, "Invalid FEN length");

        const rowsFEN = subFEN[0].split("/");
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
    }
}


export {Chessboard};
