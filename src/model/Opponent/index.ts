import {
    Chessboard,
    Color,
    Move,
} from "model";
import {sleep} from "utils";

interface OpponentSpecs {
    new(ownColor: Color, board: Chessboard): Opponent,
}

abstract class Opponent {
    private readonly _ownColor: Color;
    private readonly _board: Chessboard;

    public constructor(ownColor: Color, board: Chessboard) {
        this._ownColor = ownColor;
        this._board    = board;
    }

    public get board(): Chessboard {
        return this._board;
    }

    public get ownColor(): Color {
        return this._ownColor;
    }

    public async playTurn(): Promise<void> {
        const move = await this._getMoveToPlay();
        await sleep(Math.random() * 500 + 250);

        if (move === null) {
            // TODO: Handle victory / defeat / stalemate
            console.log("No more moves");
        } else {
            this.board.playMove(move);
        }
    }

    protected abstract _getMoveToPlay(): Promise<Move | null>;
}

export {Opponent};
export type {OpponentSpecs};
