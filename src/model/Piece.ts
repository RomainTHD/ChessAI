import {PieceColor} from "model/PieceColor";
import {PieceType} from "model/PieceType";

abstract class Piece {
    public abstract readonly type: PieceType;

    public readonly color: PieceColor;

    public constructor(color: PieceColor) {
        this.color = color;
    }

    public getFEN(): string {
        let FEN: string = this.type.FEN;

        if (this.color === PieceColor.White) {
            FEN = FEN.toUpperCase();
        } else {
            FEN = FEN.toLowerCase();
        }

        return FEN;
    }
}

export {Piece};
