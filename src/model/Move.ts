import {
    Piece,
    Position,
} from "model";

class Move {
    public readonly parentPiece: Piece;
    public readonly position: Position;
    public readonly pieceTaken: boolean;

    public readonly isCastling: boolean;
    public readonly castlingRook: Piece | null;
    public readonly castlingRookPosition: Position | null;

    private constructor(
        parentPiece: Piece,
        position: Position,
        pieceTaken: boolean,
        castlingRook: Piece | null            = null,
        castlingRookPosition: Position | null = null,
    ) {
        this.parentPiece          = parentPiece;
        this.position             = position;
        this.pieceTaken           = pieceTaken;
        this.isCastling           = castlingRook !== null;
        this.castlingRook         = castlingRook;
        this.castlingRookPosition = castlingRookPosition;
    }

    public get row(): number {
        return this.position.row;
    }

    public get col(): number {
        return this.position.col;
    }

    public static fromOffset(parentPiece: Piece, offset: Position, pieceTaken = false): Move {
        return new Move(
            parentPiece,
            parentPiece.position.add(offset),
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

    public static fromCastling(
        king: Piece,
        kingNewPosition: Position,
        rook: Piece,
        rookNewPosition: Position,
    ): Move {
        return new Move(
            king,
            kingNewPosition,
            false,
            rook,
            rookNewPosition,
        );
    }
}

export {Move};
