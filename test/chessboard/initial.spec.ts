import {expect} from "chai";
import "mocha";
import {
    Chessboard,
    Color,
} from "model";
import {countFunction} from "../shared";

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
            moves: 1,
            captures: 0,
            castles: 0,
            promotions: 0,
            checks: 0,
            checkmates: 0,
        },
        {
            moves: 20,
            captures: 0,
            castles: 0,
            promotions: 0,
            checks: 0,
            checkmates: 0,
        },
        {
            moves: 400,
            captures: 0,
            castles: 0,
            promotions: 0,
            checks: 0,
            checkmates: 0,
        },
        {
            moves: 8_902,
            captures: 34,
            castles: 0,
            promotions: 0,
            checks: 0, // TODO: 34
            checkmates: 0,
        },
    ];

    for (let depth = 0; depth < stats.length; ++depth) {
        it(`should detect the right amount of moves - depth ${depth}`, () => {
            expect(countFunction(new Chessboard(FEN), depth)).to.eql(stats[depth]);
        });
    }
});
