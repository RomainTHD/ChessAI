import {Move} from "model";
import {Opponent} from "model/Opponent";

/**
 * Player opponent
 */
class Player extends Opponent {
    /**
     * Hacky way to block the function `getMoveToPlay` while the player haven't selected its move to play
     * @type {((m: (Move | null)) => void) | null}
     * @private
     */
    private _resolve: ((m: Move | null) => void) | null = null;

    /**
     * The player selected a move to play
     * @param {Move | null} move Move to play
     */
    public moveSelected(move: Move | null): void {
        if (this._resolve === null) {
            throw new Error("Undefined resolve function");
        }

        this._resolve(move);
    }

    public async getMoveToPlay(): Promise<Move | null> {
        return new Promise((resolve: (m: Move | null) => void) => {
            this._resolve = resolve;
        });
    }
}

export {Player};
