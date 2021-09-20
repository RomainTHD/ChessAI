import {
    Chessboard,
    Color,
    Piece,
} from "model";

interface PieceComponentProps {
    /**
     * Background color, Black or White
     */
    backgroundColor: Color,

    /**
     * Can be occupied
     */
    canBeOccupied: boolean,

    /**
     * Can be taken
     */
    canBeTaken: boolean,

    /**
     * Parent chessboard
     */
    chessboard: Chessboard,

    /**
     * Piece clicked
     */
    onClick: () => void,

    /**
     * Own piece
     */
    piece: Piece | null,
}

interface PieceComponentState {
    /**
     * Piece hovered by cursor
     */
    isHovered: boolean,
}

export type {
    PieceComponentProps,
    PieceComponentState,
};
