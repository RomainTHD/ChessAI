import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

/**
 * Bishop
 */
class Bishop extends Piece {
    public readonly type = Type.Bishop;

    public async getPseudoLegalMoves(): Promise<Move[]> {
        const moves = [] as Move[];

        await Promise.all([
            this._checkStraightLines(new Position(-1, -1), moves),
            this._checkStraightLines(new Position(-1, 1), moves),
            this._checkStraightLines(new Position(1, 1), moves),
            this._checkStraightLines(new Position(1, -1), moves),
        ]);

        return moves;
    }
}

export {Bishop};
