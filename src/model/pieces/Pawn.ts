import {Move} from "model/Move";
import {Piece} from "model/Piece";
import {Type} from "model/Type";

class Pawn extends Piece {
    public readonly type = Type.Pawn;

    public getAvailableMoves(): Move[] {
        const direction = 1;
        const moves: Move[] = [];

        for (let i = 1; i <= 2; ++i) {
            if (this.position.row + i >= this.board.NB_ROWS || this.position.row + i < 0) {
                break;
            }

            if (this.board.getPiece(this.position.row + i * direction, this.position.col) === null) {
                moves.push(Move.fromOffset(this, i * direction, 0))
            }
        }

        return moves;
    }
}

export {Pawn};
