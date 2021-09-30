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
        const dir   = new Position();

        dir.set(-1, -1);
        this._checkStraightLines(dir, moves);
        dir.set(-1, 1);
        this._checkStraightLines(dir, moves);
        dir.set(1, 1);
        this._checkStraightLines(dir, moves);
        dir.set(1, -1);
        this._checkStraightLines(dir, moves);

        return moves;
    }
}

export {Bishop};
