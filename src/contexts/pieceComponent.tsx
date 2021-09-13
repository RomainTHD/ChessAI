import {Piece} from "model/Piece";
import {PieceColor} from "model/PieceColor";

interface PieceComponentProps {
    piece: Piece,
    color: PieceColor,
}

interface PieceComponentState {
    isActive: boolean,
}

export type {
    PieceComponentProps,
    PieceComponentState,
};
