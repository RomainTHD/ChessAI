class Type {
    public static readonly Empty  = new Type(" ", "");
    public static readonly Bishop = new Type("b", "bishop");
    public static readonly King   = new Type("k", "king");
    public static readonly Knight = new Type("n", "knight");
    public static readonly Pawn   = new Type("p", "pawn");
    public static readonly Queen  = new Type("q", "queen");
    public static readonly Rook   = new Type("r", "rook");

    private readonly _FEN: string;
    private readonly _name: string;

    private constructor(FEN: string, name: string) {
        this._FEN  = FEN;
        this._name = name;
    }

    public get FEN(): string {
        return this._FEN;
    }

    public get name(): string {
        return this._name;
    }

    public toString(): string {
        return this.name;
    }
}

export {Type};
