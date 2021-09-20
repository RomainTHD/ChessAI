import {
    King,
    Piece,
    Position,
    Rook,
} from "model";

/**
 * Chess move
 */
class Move {
    /**
     * Parent piece to move
     * @type {Piece}
     */
    public readonly parentPiece: Piece;

    /**
     * Target position
     * @type {Position}
     */
    public readonly position: Position;

    /**
     * Piece taken or not
     * @type {boolean}
     */
    public readonly pieceTaken: boolean;

    /**
     * Castling or not
     * @type {boolean}
     */
    public readonly isCastling: boolean;

    /**
     * If castling, the rook used
     * @type {Rook | null}
     */
    public readonly castlingRook: Rook | null;

    /**
     * If castling, the rook target position
     * @type {Position | null}
     */
    public readonly castlingRookPosition: Position | null;

    /**
     * Constructor
     * @param {Piece} parentPiece Parent piece to move
     * @param {Position} position Target position
     * @param {boolean} pieceTaken Piece taken or not
     * @param {Rook | null} castlingRook If castling, the rook used
     * @param {Position | null} castlingRookPosition If castling, the rook target position
     * @private
     */
    private constructor(
        parentPiece: Piece,
        position: Position,
        pieceTaken: boolean,
        castlingRook: Rook | null             = null,
        castlingRookPosition: Position | null = null,
    ) {
        this.parentPiece          = parentPiece;
        this.position             = position;
        this.pieceTaken           = pieceTaken;
        this.isCastling           = castlingRook !== null;
        this.castlingRook         = castlingRook;
        this.castlingRookPosition = castlingRookPosition;
    }

    /**
     * From an offset
     * @param {Piece} parentPiece Parent piece to move
     * @param {Position} offset Target offset
     * @param {boolean} pieceTaken Piece taken or not
     * @returns {Move}
     */
    public static fromOffset(parentPiece: Piece, offset: Position, pieceTaken = false): Move {
        return new Move(
            parentPiece,
            parentPiece.position.add(offset),
            pieceTaken,
        );
    }

    /**
     * From a position
     * @param {Piece} parentPiece Parent piece to move
     * @param {Position} position Target position
     * @param {boolean} pieceTaken Piece taken or not
     * @returns {Move}
     */
    public static fromPosition(parentPiece: Piece, position: Position, pieceTaken = false): Move {
        return new Move(
            parentPiece,
            position,
            pieceTaken,
        );
    }

    /**
     * From castling
     * @param {King} king King moved
     * @param {Position} kingNewPosition King target position
     * @param {Rook} rook Rook moved
     * @param {Position} rookNewPosition Rook target position
     * @returns {Move}
     */
    public static fromCastling(
        king: King,
        kingNewPosition: Position,
        rook: Rook,
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
