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
            capture: 0,
            castle: 0,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 1,
            promotion: 0,
        },
        {
            capture: 8,
            castle: 2,
            check: 0,
            checkmate: 0,
            enPassant: 0,
            move: 48,
            promotion: 0,
        },
        {
            capture: 351,
            castle: 91,
            check: 0, // TODO: 3
            checkmate: 0,
            enPassant: 0, // TODO: 1
            move: 2039,
            promotion: 0,
        },
    ] as CountResult[];

    for (let depth = 0; depth < stats.length; ++depth) {
        it(`should detect the right amount of moves - depth ${depth}`, async () => {
            expect(await countFunction(new Chessboard(FEN), depth)).to.eql(stats[depth]);
        });
    }
});
