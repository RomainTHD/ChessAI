import {
    Move,
    Piece,
    Position,
    Type,
} from "model";

class King extends Piece {
    public readonly type = Type.King;

    public getAvailableMoves(): Move[] {
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
            const checkCastling = (rowLimit: number, rowDir: number) => {
                let emptyRow = true;
                for (let i = 1; i <= rowLimit; ++i) {
                    if (this.board.getPiece(this.position.addCol(i * rowDir)) !== null) {
                        emptyRow = false;
                        break;
                    }
                }

                if (emptyRow) {
                    const rook = this.board.getPiece(this.position.addCol((rowLimit + 1) * rowDir));
                    if (rook !== null && rook.type === Type.Rook && !rook.hasMoved) {
                        const kingPos = this.position.addCol(2 * rowDir);
                        const rookPos = rook.position.addCol(rowLimit * rowDir * -1);
                        moves.push(Move.fromCastling(this, kingPos, rook, rookPos));
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
