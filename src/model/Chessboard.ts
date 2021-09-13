class Chessboard {
    private readonly _rows = 8;
    private readonly _cols = 8;

    public get cols(): number {
        return this._cols;
    }

    public get rows(): number {
        return this._rows;
    }

    public Chessboard() {

    }
}

export {Chessboard};
