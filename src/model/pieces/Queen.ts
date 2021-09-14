import {Move} from "model/Move";
import {Piece} from "model/Piece";
import {Type} from "model/Type";

class Queen extends Piece {
    public readonly type = Type.Queen;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {Queen};
