import {
    Color,
    Move,
    MoveResult,
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
            const subMoves = [] as Move[];
            const p        = this.position.addRow(i * direction);
            const res      = this._addMoveIfAvailable(p, subMoves);
            if (res === MoveResult.Occupied) {
                moves.push(subMoves[0]);
            } else {
                break;
            }
        }

        const checkDiagFunction = (position: Position) => {
            if (this.board.isValidPosition(position)) {
                const target = this.board.getPiece(position);
                if (target !== null && target.color !== this.color) {
                    moves.push(Move.fromPosition(this, position, true));
                }
            }
        };

        checkDiagFunction(this.position.add(new Position(direction, 1)));
        checkDiagFunction(this.position.add(new Position(direction, -1)));

        return moves;
    }
}

export {Pawn};
