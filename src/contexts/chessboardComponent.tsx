import {
    Chessboard,
    Move,
    Piece,
} from "model";

interface ChessboardComponentProps {
    chessboard: Chessboard,
}

interface ChessboardComponentState {
    chessboard: Chessboard,
    selectedMoves: Move[],
    selectedPiece: Piece | null,
}

export type {
    ChessboardComponentProps,
    ChessboardComponentState,
};
