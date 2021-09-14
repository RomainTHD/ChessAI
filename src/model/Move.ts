import {Piece} from "model";

class Move {
    public readonly parentPiece: Piece;
    public readonly row: number;
    public readonly col: number;
    public readonly rowOffset: number;
    public readonly colOffset: number;
    public readonly pieceTaken: boolean;

    private constructor(
        parentPiece: Piece,
        row: number,
        col: number,
        rowOffset: number,
        colOffset: number,
        pieceTaken: boolean,
    ) {
        this.parentPiece = parentPiece;
        this.row         = row;
        this.col         = col;
        this.rowOffset   = rowOffset;
        this.colOffset   = colOffset;
        this.pieceTaken  = pieceTaken;
    }

    public static fromOffset(
        parentPiece: Piece,
        rowOffset: number,
        colOffset: number,
        pieceTaken = false,
    ): Move {
        return new Move(
            parentPiece,
            parentPiece.position.row + rowOffset,
            parentPiece.position.col + colOffset,
            rowOffset,
            colOffset,
            pieceTaken,
        );
    }

    public static fromPosition(parentPiece: Piece, row: number, col: number, pieceTaken = false): Move {
        return new Move(
            parentPiece,
            row,
            col,
            row - parentPiece.position.row,
            col - parentPiece.position.col,
            pieceTaken,
        );
    }
}

export {Move};
