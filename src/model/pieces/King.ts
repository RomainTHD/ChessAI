import assert from "assert";
import {
    Move,
    Piece,
    Position,
    Rook,
    Type,
} from "model";

/**
 * King
 */
class King extends Piece {
    public readonly type = Type.King;

    public getPseudoLegalMoves(): Move[] {
        const moves = [] as Move[];

        this._checkStraightLines(new Position(-1, 0), moves, 1);
        this._checkStraightLines(new Position(0, -1), moves, 1);
        this._checkStraightLines(new Position(0, 1), moves, 1);
        this._checkStraightLines(new Position(1, 0), moves, 1);
        this._checkStraightLines(new Position(-1, -1), moves, 1);
        this._checkStraightLines(new Position(-1, 1), moves, 1);
        this._checkStraightLines(new Position(1, 1), moves, 1);
        this._checkStraightLines(new Position(1, -1), moves, 1);

        if (!this.hasMoved) {
            // Castling detection, only if the king has not moved

            const checkCastling = (rowLimit: number, rowDir: number) => {
                let emptyRow = true;
                for (let i = 1; i <= rowLimit; ++i) {
                    // Empty row up to the rook
                    const pos = this.position.addCols(i * rowDir);
                    if (!this.board.isValidPosition(pos) || this.board.getPiece(pos) !== null) {
                        emptyRow = false;
                        break;
                    }
                }

                const rookPos = this.position.addCols((rowLimit + 1) * rowDir);
                if (emptyRow && this.board.isValidPosition(rookPos)) {
                    const rook = this.board.getPiece(rookPos);
                    if (rook !== null && rook.type === Type.Rook && !rook.hasMoved) {
                        // Rook not moved, we can move it
                        assert(rook instanceof Rook, "Invalid model, different rook type and rook class");
                        const kingPos = this.position.addCols(2 * rowDir);
                        const rookPos = rook.position.addCols(rowLimit * rowDir * -1);
                        moves.push(Move.fromCastling(this, kingPos, rook as Rook, rookPos));
                    }
                }
            };

            if (this.board.castlingAllowed(this.color, Type.King)) {
                checkCastling(2, 1);
            }

            if (this.board.castlingAllowed(this.color, Type.Queen)) {
                checkCastling(3, -1);
            }
        }

        return moves;
    }
}

export {King};
