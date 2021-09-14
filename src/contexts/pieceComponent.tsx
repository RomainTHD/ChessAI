import {
    Color,
    Move,
    Piece,
} from "model";

interface PieceComponentProps {
    backgroundColor: Color,
    canBeOccupied: boolean,
    canBeTaken: boolean,
    onMovesSelected: (selectedMoves: Move[]) => void,
    piece: Piece | null,
}

interface PieceComponentState {
    isHovered: boolean,
}

export type {
    PieceComponentProps,
    PieceComponentState,
};
