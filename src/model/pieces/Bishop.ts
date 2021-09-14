import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

class Bishop extends Piece {
    public readonly type = Type.Bishop;

    public getAvailableMoves(): Move[] {
        const moves = [] as Move[];

        this._checkStraightLines(new Position(-1, -1), moves);
        this._checkStraightLines(new Position(-1, 1), moves);
        this._checkStraightLines(new Position(1, 1), moves);
        this._checkStraightLines(new Position(1, -1), moves);

        return moves;
    }
}

export {Bishop};
