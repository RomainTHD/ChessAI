import {Piece} from "model/Piece";

class Move {
    public readonly parentPiece: Piece;
    public readonly row: number;
    public readonly col: number;
    public readonly rowOffset: number;
    public readonly colOffset: number;

    private constructor(parentPiece: Piece, row: number, col: number, rowOffset: number, colOffset: number) {
        this.parentPiece = parentPiece;
        this.row         = row;
        this.col         = col;
        this.rowOffset   = rowOffset;
        this.colOffset   = colOffset;
    }

    public static fromOffset(parentPiece: Piece, rowOffset: number, colOffset: number): Move {
        return new Move(
            parentPiece,
            parentPiece.position.row + rowOffset,
            parentPiece.position.col + colOffset,
            rowOffset,
            colOffset,
        );
    }

    public static fromPosition(parentPiece: Piece, row: number, col: number): Move {
        return new Move(
            parentPiece,
            row,
            col,
            row - parentPiece.position.row,
            col - parentPiece.position.col,
        );
    }
}

export {Move};
