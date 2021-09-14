import {
    Piece,
    Position,
} from "model";
import {Move} from "model/Move";
import {Type} from "model/Type";

class Rook extends Piece {
    public readonly type = Type.Rook;

    public getAvailableMoves(): Move[] {
        const moves = [] as Move[];

        this._checkStraightLines(new Position(-1, 0), moves);
        this._checkStraightLines(new Position(0, -1), moves);
        this._checkStraightLines(new Position(0, 1), moves);
        this._checkStraightLines(new Position(1, 0), moves);

        return moves;
    }
}

export {Rook};
