import {
    Piece,
    Position,
} from "model";

class Move {
    public readonly parentPiece: Piece;
    public readonly position: Position;
    public readonly pieceTaken: boolean;

    private constructor(
        parentPiece: Piece,
        position: Position,
        pieceTaken: boolean,
    ) {
        this.parentPiece = parentPiece;
        this.position    = position;
        this.pieceTaken  = pieceTaken;
    }

    public get row() {
        return this.position.row;
    }

    public get col() {
        return this.position.col;
    }

    public static fromOffset(parentPiece: Piece, offset: Position, pieceTaken = false): Move {
        return new Move(
            parentPiece,
            Position.add(parentPiece.position, offset),
            pieceTaken,
        );
    }

    public static fromPosition(parentPiece: Piece, position: Position, pieceTaken = false): Move {
        return new Move(
            parentPiece,
            position,
            pieceTaken,
        );
    }
}

export {Move};
