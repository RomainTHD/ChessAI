import {
    Chessboard,
    Move,
    Piece,
} from "model";

interface ChessboardComponentProps {
    /**
     * Parent chessboard
     */
    chessboard: Chessboard,
}

interface ChessboardComponentState {
    /**
     * Current chessboard, same as props
     */
    chessboard: Chessboard,

    /**
     * Highlighted moves
     */
    selectedMoves: Move[],

    /**
     * Selected piece to move
     */
    selectedPiece: Piece | null,
}

export type {
    ChessboardComponentProps,
    ChessboardComponentState,
};
