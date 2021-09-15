import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

class King extends Piece {
    public readonly type = Type.King;

    public getAvailableMoves(): Move[] {
        const moves = [] as Move[];

        this._checkStraightLines(new Position(-1, 0), moves, 1);
        this._checkStraightLines(new Position(0, -1), moves, 1);
        this._checkStraightLines(new Position(0, 1), moves, 1);
        this._checkStraightLines(new Position(1, 0), moves, 1);
        this._checkStraightLines(new Position(-1, -1), moves, 1);
        this._checkStraightLines(new Position(-1, 1), moves, 1);
        this._checkStraightLines(new Position(1, 1), moves, 1);
        this._checkStraightLines(new Position(1, -1), moves, 1);

        return moves;
    }
}

export {King};
