class PieceType {
    public static readonly Empty  = new PieceType(" ", "");
    public static readonly Bishop = new PieceType("b", "bishop");
    public static readonly King   = new PieceType("k", "king");
    public static readonly Knight = new PieceType("n", "knight");
    public static readonly Pawn   = new PieceType("p", "pawn");
    public static readonly Queen  = new PieceType("q", "queen");
    public static readonly Rook   = new PieceType("r", "rook");

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

export {PieceType};
