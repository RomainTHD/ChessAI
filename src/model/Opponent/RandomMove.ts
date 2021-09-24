import {
    Move,
    Piece,
} from "model";
import {Opponent} from "model/Opponent";
import {
    shuffleArray,
    sleep,
} from "utils";

/**
 * Basic opponent, plays randomly
 */
class RandomMove extends Opponent {
    public async getMoveToPlay(waitForPlayer: boolean): Promise<Move | null> {
        // All the pieces with the same color
        const pieces   = [...this.board.getPieces(this.ownColor)];
        let moveToPlay = null as Move | null;

        shuffleArray(pieces);

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
