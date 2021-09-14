class Position {
    public row: number;
    public col: number;

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    public static add(pos1: Position, pos2: Position): Position {
        return new Position(pos1.row + pos2.row, pos1.col + pos2.col);
    }
}

export {Position};
