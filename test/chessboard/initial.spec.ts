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
            move: 20,
            promotion: 0,
        },
        {
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 400,
            promotion: 0,
        },
        {
            capture: 34,
            castle: 0,
            check: 0, // TODO: 12
            checkmate: 0,
            enPassant: 0,
            move: 8_902,
            promotion: 0,
        },
    ] as CountResult[];

    for (let depth = 0; depth < stats.length; ++depth) {
        it(`should detect the right amount of moves - depth ${depth}`, () => {
            expect(countFunction(new Chessboard(FEN), depth)).to.eql(stats[depth]);
        });
    }
});
