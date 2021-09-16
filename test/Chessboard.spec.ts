import {expect} from "chai";
import "mocha";
import {
    Chessboard,
    Color,
} from "model";

describe("Initial color", () => {
    it("should be White turn", () => {
        const board = new Chessboard();
        const color = board.activeColor;
        expect(color).to.equal(Color.White);
    });
});
