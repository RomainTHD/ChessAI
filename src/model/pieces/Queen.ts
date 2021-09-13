import {Piece} from "model/Piece";
import {PieceType} from "model/PieceType";

class Queen extends Piece {
    public readonly type = PieceType.Queen;
}

export {Queen};
