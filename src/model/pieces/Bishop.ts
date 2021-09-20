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

    public getPseudoLegalMoves(): Move[] {
        const moves = [] as Move[];

        this._checkStraightLines(new Position(-1, -1), moves);
        this._checkStraightLines(new Position(-1, 1), moves);
        this._checkStraightLines(new Position(1, 1), moves);
        this._checkStraightLines(new Position(1, -1), moves);

        return moves;
    }
}

export {Bishop};
