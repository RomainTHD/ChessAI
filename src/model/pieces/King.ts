import {Piece} from "model";
import {Move} from "model/Move";
import {Type} from "model/Type";

class King extends Piece {
    public readonly type = Type.King;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {King};
