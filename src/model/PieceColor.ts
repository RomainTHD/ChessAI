class PieceColor {
    public static readonly Black = new PieceColor("black");
    public static readonly White = new PieceColor("white");
    public static readonly Empty = new PieceColor(" ");

    private readonly _color: string;

    private constructor(color: string) {
        this._color = color;
    }

    public get color(): string {
        return this._color;
    }

    public toString(): string {
        return this.color;
    }
}

export {PieceColor};
