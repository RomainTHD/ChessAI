import assert from "assert";
import {Move} from "model";
import {Opponent} from "model/Opponent";

class Player extends Opponent {
    private _resolve: ((m: Move | null) => void) | null = null;

    public moveSelected(m: Move | null): void {
        assert(this._resolve !== null);
        this._resolve(m);
    }

    public async getMoveToPlay(): Promise<Move | null> {
        return new Promise((resolve: (m: Move | null) => void) => {
            this._resolve = resolve;
        });
    }
}

export {Player};
