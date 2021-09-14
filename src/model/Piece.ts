import {Chessboard} from "model/Chessboard";
import {Color} from "model/Color";
import {Move} from "model/Move";
import {Position} from "model/Position";
import {Type} from "model/Type";

abstract class Piece {
    public abstract readonly type: Type;

    public readonly board: Chessboard;
    public readonly color: Color;
    public readonly position: Position;

    public constructor(board: Chessboard, color: Color, position: Position) {
        this.board    = board;
        this.color    = color;
        this.position = position;
    }

    public getFEN(): string {
        let FEN = this.type.FEN;

        if (this.color === Color.White) {
            FEN = FEN.toUpperCase();
        } else {
            FEN = FEN.toLowerCase();
        }

        return FEN;
    }

    public abstract getAvailableMoves(): Move[];
}

export {Piece};
