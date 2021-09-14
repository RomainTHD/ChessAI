class Color {
    public static readonly Black = new Color("black");
    public static readonly White = new Color("white");

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

export {Color};
