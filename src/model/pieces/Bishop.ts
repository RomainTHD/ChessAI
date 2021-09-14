import {
    Move,
    Piece,
    Type,
} from "model";

class Bishop extends Piece {
    public readonly type = Type.Bishop;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {Bishop};
