import {
    Piece,
    Position,
} from "model";
import {Move} from "model/Move";
import {Type} from "model/Type";

/**
 * Rook
 */
class Rook extends Piece {
    public readonly type = Type.Rook;

    public getPseudoLegalMoves(): Move[] {
        const moves = [] as Move[];
        const dir   = new Position();

        dir.set(-1, 0);
        this._checkStraightLines(dir, moves);
        dir.set(0, -1);
        this._checkStraightLines(dir, moves);
        dir.set(0, 1);
        this._checkStraightLines(dir, moves);
        dir.set(1, 0);
        this._checkStraightLines(dir, moves);

        return moves;
    }
}

export {Rook};
