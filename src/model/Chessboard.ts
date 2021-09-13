import {Piece} from "model/Piece";
import {PieceColor} from "model/PieceColor";
import {
    Bishop,
    Empty,
    King,
    Knight,
    Pawn,
    Queen,
    Rook,
} from "model/pieces";

class Chessboard {
    public readonly NB_ROWS = 8;
    public readonly NB_COLS = 8;

    private readonly _board: Piece[][];

    public constructor() {
        this._board = [];

        for (let row = 0; row < this.NB_ROWS; ++row) {
            const currentRow: Piece[] = [];

            for (let col = 0; col < this.NB_COLS; ++col) {
                let piece: Piece = new Empty();
                let color        = (row <= 1) ? PieceColor.White : PieceColor.Black;

                if (row === 1 || row === this.NB_ROWS - 2) {
                    piece = new Pawn(color);
                } else if (row === 0 || row === this.NB_ROWS - 1) {
                    if (col === 0 || col === this.NB_COLS - 1) {
                        piece = new Rook(color);
                    } else if (col === 1 || col === this.NB_COLS - 2) {
                        piece = new Knight(color);
                    } else if (col === 2 || col === this.NB_COLS - 3) {
                        piece = new Bishop(color);
                    } else if (col === 3) {
                        piece = new King(color);
                    } else if (col === 4) {
                        piece = new Queen(color);
                    }
                }

                currentRow.push(piece);
            }

            this._board.push(currentRow);
        }
    }

    public getPiece(row: number, col: number): Piece {
        return this._board[row][col];
    }
}

export {Chessboard};
