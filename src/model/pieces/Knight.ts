import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

/**
 * Knight
 */
class Knight extends Piece {
    public readonly type = Type.Knight;

    public getPseudoLegalMoves(): Move[] {
        const moves = [] as Move[];

        for (const rDir of [-1, 1]) {
            for (const cDir of [-1, 1]) {
                this._addMoveIfAvailable(Position.addCoords(this.position, rDir, cDir * 2), moves);
                this._addMoveIfAvailable(Position.addCoords(this.position, rDir * 2, cDir), moves);
            }
        }

        return moves;
    }
}

export {Knight};
