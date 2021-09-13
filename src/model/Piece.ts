import {Color} from "model/Color";
import {Move} from "model/Move";
import {Type} from "model/Type";
import {Position} from "model/Position";

abstract class Piece {
    public abstract readonly type: Type;

    public readonly color: Color;
    public readonly position: Position;

    public constructor(color: Color, position: Position) {
        this.color    = color;
        this.position = position;
    }

    public getFEN(): string {
        let FEN: string = this.type.FEN;

        if (this.color === Color.White) {
            FEN = FEN.toUpperCase();
        } else {
            FEN = FEN.toLowerCase();
        }

        return FEN;
    }

    public getAvailableMoves(): Move[] {
        return [];
    }
}

export {Piece};
