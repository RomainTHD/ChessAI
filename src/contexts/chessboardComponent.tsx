import {
    Chessboard,
    Move,
} from "model";

interface ChessboardComponentProps {
    chessboard: Chessboard,
}

interface ChessboardComponentState {
    selectedMoves: Move[],
}

export type {
    ChessboardComponentProps,
    ChessboardComponentState,
};
