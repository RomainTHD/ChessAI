import {expect} from "chai";
import "mocha";
import {
    Chessboard,
    Color,
} from "model";
import {
    countFunction,
    CountResult,
} from "../shared";

describe("Available moves for custom map : promotion", () => {
    const FEN = "8/k1P/8/8/8/8/8/K w KQkq -";

    it("should be White turn", () => {
        const board = new Chessboard(FEN);
        expect(board.activeColor).to.equal(Color.White);
    });

    it("should have the right number of pieces", () => {
        const board = new Chessboard(FEN);
        expect(board.getPieces(Color.Black).length).to.equal(1);
        expect(board.getPieces(Color.White).length).to.equal(2);
        expect(board.getAllPieces().length).to.equal(3);
    });

    const stats = [
        {
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 1,
            promotion: 0,
        },
        {
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 7,
            promotion: 4,
        },
        {
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 23, // FIXME: Verify this
            promotion: 4,
        },
    ] as CountResult[];

    for (let depth = 0; depth < stats.length; ++depth) {
        it(`should detect the right amount of moves - depth ${depth}`, () => {
            expect(countFunction(new Chessboard(FEN), depth)).to.eql(stats[depth]);
        });
    }
});
