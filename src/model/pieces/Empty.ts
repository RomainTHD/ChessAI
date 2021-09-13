import {Piece} from "model/Piece";
import {Color} from "model/Color";
import {Type} from "model/Type";
import {Position} from "model/Position";

class Empty extends Piece {
    public readonly type = Type.Empty;

    public constructor() {
        super(Color.Empty, new Position(NaN, NaN));
    }
}

export {Empty};
