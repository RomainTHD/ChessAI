import assert from "assert";
import {
    King,
    Pawn,
    Piece,
    Position,
    Rook,
    Type,
} from "model";

interface State {
    pieceTaken: Piece | null,
    oldParentPiecePosition: Position,
    oldMovedState: boolean,
    oldCastlingRookPosition: Position | null;
    oldCastlingRookMovedState: boolean | null;
    pieceTakenIndex: number;
}

/**
 * Chess move
 */
class Move {
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
     * @type {Rook}
     */
    public readonly castlingRook?: Rook;

    /**
     * If castling, the rook target position
     * @type {Position}
     */
    public readonly castlingRookPosition?: Position;

    /**
     * Promotion or not
     * @type {boolean}
     */
    public readonly isPromotion: boolean;
    /**
     * If promotion, new pawn type after a promotion
     * @type {Type}
     */
    public readonly promotionNewType?: Type;
    /**
     * Parent piece to move
     * @type {Piece}
     * @private
     */
    private _parentPiece: Piece;
    private _state?: State;

    /**
     * Constructor
     * @param {Piece} parentPiece Parent piece to move
     * @param {Position} position Target position
     * @param {boolean} pieceTaken Piece taken or not
     * @param {Rook} castlingRook If castling, the rook used
     * @param {Position} castlingRookPosition If castling, the rook target position
     * @param {Type} promotionNewType New pawn type after a promotion
     * @private
     */
    private constructor(
        parentPiece: Piece,
        position: Position,
        pieceTaken: boolean,
        castlingRook?: Rook,
        castlingRookPosition?: Position,
        promotionNewType?: Type,
    ) {
        this._parentPiece = parentPiece;
        this.position     = position;
        this.pieceTaken   = pieceTaken;

        this.isCastling = castlingRook !== void 0;
        if (this.isCastling) {
            this.castlingRook         = castlingRook;
            this.castlingRookPosition = castlingRookPosition;
        }

        this.isPromotion = promotionNewType !== void 0;
        if (this.isPromotion) {
            this.promotionNewType = promotionNewType;
        }
    }

    /**
     * @returns {Piece} Parent piece to move
     */
    public get parentPiece(): Piece {
        return this._parentPiece;
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

    /**
     * From a position
     * @param {Pawn} pawn Pawn to move
     * @param {Position} position Target position
     * @param {Type} newType New pawn type after the promotion
     * @param {boolean} pieceTaken Piece taken or not
     * @returns {Move}
     */
    public static fromPromotion(pawn: Pawn, position: Position, newType: Type, pieceTaken = false): Move {
        return new Move(
            pawn,
            position,
            pieceTaken,
            void 0,
            void 0,
            newType,
        );
    }

    public setBoardState(state: State): void {
        this._state = state;
    }

    public getBoardState(): State {
        assert(this._state);
        return this._state;
    }

    /**
     * Replace its parent piece
     * @param {Piece} newParentPiece New parent piece
     */
    public replaceParentPiece(newParentPiece: Piece): void {
        this._parentPiece = newParentPiece;
    }
}

export {Move};
export type {State};
