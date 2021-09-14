import {Piece} from "model";
import {Move} from "model/Move";
import {Type} from "model/Type";

class Knight extends Piece {
    public readonly type = Type.Knight;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {Knight};
