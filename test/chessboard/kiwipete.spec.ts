import {expect} from "chai";
import "mocha";
import {
    Chessboard,
    Color,
} from "model";
import {countFunction} from "../shared";

describe("Available moves for Kiwipete", () => {
    const FEN = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";

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
            moves: 48,
            captures: 8,
            castles: 2,
            promotions: 0,
            checks: 0,
            checkmates: 0,
        },
        {
            moves: 2039,
            captures: 351,
            castles: 91,
            promotions: 0,
            checks: 0, // TODO: 3
            checkmates: 0,
        },
    ];

    for (let depth = 0; depth < stats.length; ++depth) {
        it(`should detect the right amount of moves - depth ${depth}`, () => {
            expect(countFunction(new Chessboard(FEN), depth)).to.eql(stats[depth]);
        });
    }
});
