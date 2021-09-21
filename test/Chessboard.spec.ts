import {expect} from "chai";
import "mocha";
import {
    Chessboard,
    Color,
} from "model";

describe("Available moves for start position", () => {
    const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    it("should be White turn", () => {
        const board = new Chessboard(FEN);
        expect(board.activeColor).to.equal(Color.White);
    });

    it("should have the right number of pieces", () => {
        const board = new Chessboard(FEN);
        expect(board.getPieces(Color.Black).length).to.equal(16);
        expect(board.getPieces(Color.White).length).to.equal(16);
        expect(board.getAllPieces().length).to.equal(32);
    });

    it("should detect the right amount of moves - depth 0", () => {
        const board    = new Chessboard(FEN);
        let movesCount = 0;
        for (const piece of board.getPieces(board.activeColor)) {
            movesCount += piece.getLegalMoves().length;
        }

        expect(movesCount).to.equal(20);
    });

    it("should detect the right amount of moves - depth 1", () => {
        // FIXME: Messy
        const board    = new Chessboard(FEN);
        let movesCount = 0;
        for (const piece of board.getPieces(board.activeColor)) {
            const moves = piece.getLegalMoves();
            for (const move of moves) {
                board.tryMove(move, (subBoard) => {
                    for (const subPiece of subBoard.getPieces(subBoard.activeColor)) {
                        const subMoves = subPiece.getLegalMoves();
                        movesCount += subMoves.length;
                    }
                });
            }
        }

        expect(movesCount).to.equal(400);
    });
});
