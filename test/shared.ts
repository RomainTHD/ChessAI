import {Chessboard} from "model/Chessboard";

interface CountResult {
    moves: number,
    captures: number,
    castles: number,
    promotions: number,
    checks: number,
    checkmates: number,
}

function countFunction(board: Chessboard, depth: number): CountResult {
    if (depth === 0) {
        return {
            moves: 1,
            captures: 0,
            castles: 0,
            promotions: 0,
            checks: 0,
            checkmates: 0,
        };
    } else {
        let count: CountResult = {
            moves: 0,
            captures: 0,
            castles: 0,
            promotions: 0,
            checks: 0,
            checkmates: 0,
        };

        for (const piece of board.getPieces(board.activeColor)) {
            const moves = piece.getLegalMoves();
            for (const move of moves) {
                board.tryMove(move, (subBoard: Chessboard) => {
                    const res = countFunction(subBoard, depth - 1);
                    count.moves += res.moves;
                    count.captures += res.captures + Number(move.pieceTaken);
                    count.castles += res.castles + Number(move.isCastling);
                    count.promotions += res.promotions + Number(move.isPromotion);
                    count.checks += res.checks; // TODO
                    count.checkmates += res.checkmates; // TODO
                });
            }
        }

        return count;
    }
}

export {countFunction};
export type {CountResult};
