import {Piece} from "model/Piece";
import {Color} from "model/Color";

interface PieceComponentProps {
    piece: Piece,
    color: Color,
}

interface PieceComponentState {
    isActive: boolean,
}

export type {
    PieceComponentProps,
    PieceComponentState,
};
