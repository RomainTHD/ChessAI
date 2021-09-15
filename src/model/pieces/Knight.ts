import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

class Knight extends Piece {
    public readonly type = Type.Knight;

    public getAvailableMoves(): Move[] {
        const moves   = [] as Move[];
        const offsets = [] as Position[];

        for (const rDir of [-1, 1]) {
            for (const cDir of [-1, 1]) {
                offsets.push(new Position(rDir, cDir * 2));
                offsets.push(new Position(rDir * 2, cDir));
            }
        }

        for (const offset of offsets) {
            this._addMoveIfAvailable(this.position.add(offset), moves);
        }

        return moves;
    }
}

export {Knight};
