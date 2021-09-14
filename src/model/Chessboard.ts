import {Color} from "model/Color";
import {Piece} from "model/Piece";
import {
    Bishop,
    King,
    Knight,
    Pawn,
    Queen,
    Rook,
} from "model/pieces";
import {Position} from "model/Position";

class Chessboard {
    public readonly NB_ROWS = 8;
    public readonly NB_COLS = 8;

    private readonly _board: (Piece | null)[][];

    public constructor() {
        this._board = [];

        for (let row = 0; row < this.NB_ROWS; ++row) {
            const currentRow = [] as (Piece | null)[];

            for (let col = 0; col < this.NB_COLS; ++col) {
                let piece = null as Piece | null;
                let color = (row <= 1) ? Color.White : Color.Black;
                let pos   = new Position(row, col);

                if (row === 1 || row === this.NB_ROWS - 2) {
                    piece = new Pawn(this, color, pos);
                } else if (row === 0 || row === this.NB_ROWS - 1) {
                    if (col === 0 || col === this.NB_COLS - 1) {
                        piece = new Rook(this, color, pos);
                    } else if (col === 1 || col === this.NB_COLS - 2) {
                        piece = new Knight(this, color, pos);
                    } else if (col === 2 || col === this.NB_COLS - 3) {
                        piece = new Bishop(this, color, pos);
                    } else if (col === 3) {
                        piece = new King(this, color, pos);
                    } else if (col === 4) {
                        piece = new Queen(this, color, pos);
                    }
                }

                currentRow.push(piece);
            }

            this._board.push(currentRow);
        }
    }

    public getPiece(row: number, col: number): Piece | null {
        return this._board[row][col];
    }
}

export {Chessboard};
