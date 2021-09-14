import {
    Color,
    Piece,
} from "model";

interface PieceComponentProps {
    backgroundColor: Color,
    canBeOccupied: boolean,
    canBeTaken: boolean,
    onClick: () => void,
    piece: Piece | null,
}

interface PieceComponentState {
    isHovered: boolean,
}

export type {
    PieceComponentProps,
    PieceComponentState,
};
