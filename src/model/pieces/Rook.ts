import {Move} from "model/Move";
import {Piece} from "model/Piece";
import {Type} from "model/Type";

class Rook extends Piece {
    public readonly type = Type.Rook;

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {Rook};
