import {Move} from "model/Move";
import {Piece} from "model/Piece";
import {Type} from "model/Type";

class King extends Piece {
    public readonly type = Type.King;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {King};
