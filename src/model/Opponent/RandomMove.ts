import {
    Move,
    Piece,
} from "model";
import {Opponent} from "model/Opponent";

class RandomMove extends Opponent {
    protected async _getMoveToPlay(): Promise<Move | null> {
        const pieces   = [...this.board.getPieces(this.ownColor)];
        let moveToPlay = null as Move | null;

        for (let i = pieces.length - 1; i > 0; i--) {
            const j                = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }

        while (pieces.length !== 0 && moveToPlay === null) {
            const currentPiece = pieces.pop() as Piece;
            const moves        = currentPiece.getAvailableMoves();

            if (moves.length !== 0) {
                moveToPlay = moves[Math.floor(Math.random() * moves.length)];
            }
        }

        return moveToPlay;
    }
}

export {RandomMove};
