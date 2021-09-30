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

    public async getPseudoLegalMoves(): Promise<Move[]> {
        // Change direction according to the color
        const direction = this.color === Color.White ? 1 : -1;
        const rawMoves  = [] as Move[];

        this._checkInFront(rawMoves, direction);

        this._checkDiagonals(rawMoves, this.position.add(new Position(direction, 1)));
        this._checkDiagonals(rawMoves, this.position.add(new Position(direction, -1)));

        return this._checkForPromotions(rawMoves);
    }

    private _checkInFront(rawMoves: Move[], direction: number): void {
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
    }

    private _checkForPromotions(rawMoves: Move[]): Move[] {
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

    private _checkDiagonals(rawMoves: Move[], position: Position): void {
        if (this.board.isValidPosition(position)) {
            const target = this.board.getPiece(position);
            if (target !== null && target.color !== this.color) {
                rawMoves.push(Move.fromPosition(this, position, true));
            }
        }
    }
}

export {Pawn};

// TODO: En passant
