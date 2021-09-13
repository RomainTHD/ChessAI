import {Piece} from "model/Piece";
import {PieceColor} from "model/PieceColor";
import {PieceType} from "model/PieceType";

class Empty extends Piece {
    public readonly type = PieceType.Empty;

    public constructor() {
        super(PieceColor.Empty);
    }
}

export {Empty};
