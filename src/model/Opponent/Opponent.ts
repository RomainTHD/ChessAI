import {
    Chessboard,
    Color,
    Move,
} from "model";

/**
 * Generic opponent
 */
abstract class Opponent {
    /**
     * Color played
     * @type {Color}
     * @private
     */
    private _ownColor: Color;

    /**
     * Parent board
     * @type {Chessboard}
     * @private
     */
    private readonly _board: Chessboard;

    /**
     * Constructor
     * @param {Chessboard} board Parent board
     */
    public constructor(board: Chessboard) {
        this._ownColor = Color.White;
        this._board    = board;
    }

    /**
     * @returns {Chessboard} Parent board
     */
    public get board(): Chessboard {
        return this._board;
    }

    /**
     * @returns {Color} Own color
     */
    public get ownColor(): Color {
        return this._ownColor;
    }

    /**
     * @param {Color} color Own color to set
     */
    public setOwnColor(color: Color): void {
        this._ownColor = color;
    }

    /**
     * Asynchronously returns the move to play, or null if there are no available move left
     * @param {boolean} waitForPlayer If we should wait or return a result instantaneously
     * @returns {Promise<Move | null>} Move to play
     */
    public abstract getMoveToPlay(waitForPlayer: boolean): Promise<Move | null>;
}

export {Opponent};
