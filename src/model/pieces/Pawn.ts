import {
    Color,
    Move,
    MoveResult,
    Piece,
    Position,
    Type,
} from "model";

/**
 * Pawn
 */
class Pawn extends Piece {
    public readonly type = Type.Pawn;

    public getPseudoLegalMoves(): Move[] {
        // Change direction according to the color
        const direction = this.color === Color.White ? 1 : -1;
        const rawMoves  = [] as Move[];

        // Useful for the pawns on the initial row
        let upperBound = 1;
        if ((this.color === Color.White && this.position.row === 1) ||
            (this.color === Color.Black && this.position.row === this.board.NB_ROWS - 2)
        ) {
            upperBound = 2;
        }

        for (let i = 1; i <= upperBound; ++i) {
            const subMoves = [] as Move[];
            const p        = this.position.addRows(i * direction);
            const res      = this._addMoveIfAvailable(p, subMoves);
            if (res === MoveResult.Occupied) {
                rawMoves.push(subMoves[0]);
            } else {
                break;
            }
        }

        // Checks for the pieces in its diagonal
        const checkDiagFunction = (position: Position) => {
            if (this.board.isValidPosition(position)) {
                const target = this.board.getPiece(position);
                if (target !== null && target.color !== this.color) {
                    rawMoves.push(Move.fromPosition(this, position, true));
                }
            }
        };

        checkDiagFunction(this.position.add(new Position(direction, 1)));
        checkDiagFunction(this.position.add(new Position(direction, -1)));

        const moves = [];

        for (const rawMove of rawMoves) {
            if ((this.color === Color.White && rawMove.position.row === this.board.NB_ROWS - 1) ||
                (this.color === Color.Black && rawMove.position.row === 0)
            ) {
                for (const type of [Type.Bishop, Type.Knight, Type.Queen, Type.Rook]) {
                    moves.push(Move.fromPromotion(this, rawMove.position, type, rawMove.pieceTaken));
                }
            } else {
                moves.push(rawMove);
            }
        }

        return moves;
    }
}

export {Pawn};

// TODO: En passant
