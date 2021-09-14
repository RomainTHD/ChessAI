import {
    Color,
    Piece,
} from "model";

interface PieceComponentProps {
    piece: Piece | null,
    backgroundColor: Color,
}

interface PieceComponentState {
    isActive: boolean,
}

export type {
    PieceComponentProps,
    PieceComponentState,
};
