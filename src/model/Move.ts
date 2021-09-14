import {Piece} from "model/Piece";

class Move {
    public readonly parentPiece: Piece;
    public readonly row: number;
    public readonly col: number;
    public readonly rowOffset: number;
    public readonly colOffset: number;
    public readonly kills: boolean;

    private constructor(
        parentPiece: Piece,
        row: number,
        col: number,
        rowOffset: number,
        colOffset: number,
        kills: boolean,
    ) {
        this.parentPiece = parentPiece;
        this.row         = row;
        this.col         = col;
        this.rowOffset   = rowOffset;
        this.colOffset   = colOffset;
        this.kills       = kills;
    }

    public static fromOffset(parentPiece: Piece, rowOffset: number, colOffset: number, kills = false): Move {
        return new Move(
            parentPiece,
            parentPiece.position.row + rowOffset,
            parentPiece.position.col + colOffset,
            rowOffset,
            colOffset,
            kills,
        );
    }

    public static fromPosition(parentPiece: Piece, row: number, col: number, kills = false): Move {
        return new Move(
            parentPiece,
            row,
            col,
            row - parentPiece.position.row,
            col - parentPiece.position.col,
            kills,
        );
    }
}

export {Move};
