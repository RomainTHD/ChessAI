import {
    Chessboard,
    Color,
    Move,
} from "model";

abstract class Opponent {
    private _ownColor: Color;
    private readonly _board: Chessboard;

    public constructor(board: Chessboard) {
        this._ownColor = Color.White;
        this._board    = board;
    }

    public get board(): Chessboard {
        return this._board;
    }

    public get ownColor(): Color {
        return this._ownColor;
    }

    public setOwnColor(color: Color) {
        this._ownColor = color;
    }

    public abstract getMoveToPlay(waitForPlayer: boolean): Promise<Move | null>;
}

export {Opponent};
