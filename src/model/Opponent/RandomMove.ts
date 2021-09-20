import {
    Move,
    Piece,
} from "model";
import {Opponent} from "model/Opponent";
import {sleep} from "utils";

/**
 * Basic opponent, plays randomly
 */
class RandomMove extends Opponent {
    public async getMoveToPlay(waitForPlayer: boolean): Promise<Move | null> {
        // All the pieces with the same color
        const pieces   = [...this.board.getPieces(this.ownColor)];
        let moveToPlay = null as Move | null;

        // Shuffle the pieces
        for (let i = pieces.length - 1; i > 0; i--) {
            const j                = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }

        while (pieces.length !== 0 && moveToPlay === null) {
            const currentPiece = pieces.pop() as Piece;
            const moves        = currentPiece.getLegalMoves();

            if (moves.length !== 0) {
                // The selected piece has some legal moves, we randomly pick one
                moveToPlay = moves[Math.floor(Math.random() * moves.length)];
            }
        }

        if (waitForPlayer) {
            await sleep(500);
        }

        return moveToPlay;
    }
}

export {RandomMove};
