import {Move} from "model/Move";
import {Piece} from "model/Piece";
import {Type} from "model/Type";

class Bishop extends Piece {
    public readonly type = Type.Bishop;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {Bishop};
