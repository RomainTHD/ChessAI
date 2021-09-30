import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

/**
 * Queen
 */
class Queen extends Piece {
    public readonly type = Type.Queen;

    public async getPseudoLegalMoves(): Promise<Move[]> {
        const moves = [] as Move[];

        await Promise.all([
            this._checkStraightLines(new Position(-1, 0), moves),
            this._checkStraightLines(new Position(0, -1), moves),
            this._checkStraightLines(new Position(0, 1), moves),
            this._checkStraightLines(new Position(1, 0), moves),
            this._checkStraightLines(new Position(-1, -1), moves),
            this._checkStraightLines(new Position(-1, 1), moves),
            this._checkStraightLines(new Position(1, 1), moves),
            this._checkStraightLines(new Position(1, -1), moves),
        ]);

        return moves;
    }
}

export {Queen};
