import {Piece} from "model";
import {Color} from "model/Color";
import {Move} from "model/Move";
import {Type} from "model/Type";

class Pawn extends Piece {
    public readonly type = Type.Pawn;

    public getAvailableMoves(): Move[] {
        // Change direction according to the color
        const direction = this.color === Color.White ? 1 : -1;
        const moves     = [] as Move[];

        for (let i = 1; i <= 2; ++i) {
            if (this.position.row + i >= this.board.NB_ROWS || this.position.row + i < 0) {
                break;
            }

            if (this.board.getPiece(this.position.row + i * direction, this.position.col) === null) {
                moves.push(Move.fromOffset(this, i * direction, 0));
            }
        }

        return moves;
    }
}

export {Pawn};
