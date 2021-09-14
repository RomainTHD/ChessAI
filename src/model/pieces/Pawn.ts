import {
    Color,
    Move,
    Piece,
    Position,
    Type,
} from "model";

class Pawn extends Piece {
    public readonly type = Type.Pawn;

    public getAvailableMoves(): Move[] {
        // Change direction according to the color
        const direction = this.color === Color.White ? 1 : -1;
        const moves     = [] as Move[];

        let upperBound = 1;
        if ((this.color === Color.White && this.position.row === 1) ||
            (this.color === Color.Black && this.position.row === this.board.NB_ROWS - 2)
        ) {
            upperBound = 2;
        }

        for (let i = 1; i <= upperBound; ++i) {
            this._addMoveIfAvailable(Position.add(this.position, new Position(i * direction, 0)), moves);
        }

        return moves;
    }
}

export {Pawn};
