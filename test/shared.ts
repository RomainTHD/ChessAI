import {Chessboard} from "model/Chessboard";

interface CountResult {
    capture: number,
    castle: number,
    check: number,
    checkmate: number,
    enPassant: number,
    move: number,
    promotion: number,
}

function countFunction(board: Chessboard, depth: number): CountResult {
    if (depth === 0) {
        return {
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 1,
            promotion: 0,
        } as CountResult;
    } else {
        let count = {
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 0,
            promotion: 0,
        } as CountResult;

        for (const piece of board.getPieces(board.activeColor)) {
            const moves = piece.getLegalMoves();
            for (const move of moves) {
                board.tryMove(move, (subBoard: Chessboard) => {
                    const res = countFunction(subBoard, depth - 1);
                    count.capture += res.capture + Number(move.pieceTaken);
                    count.castle += res.castle + Number(move.isCastling);
                    count.check += res.check; // TODO
                    count.checkmate += res.checkmate; // TODO
                    count.enPassant += res.enPassant; // TODO
                    count.move += res.move;
                    count.promotion += res.promotion + Number(move.isPromotion);
                });
            }
        }

        return count;
    }
}

export {countFunction};
export type {CountResult};
