/**
 * Position
 */
class Position {
    /**
     * Row
     * @type {number}
     */
    private _row: number;

    /**
     * Column
     * @type {number}
     */
    private _col: number;

    /**
     * Constructor
     * @param {number} row Row
     * @param {number} col Column
     */
    public constructor(row = 0, col = 0) {
        this._row = row;
        this._col = col;
    }

    public get row(): number {
        return this._row;
    }

    public get col(): number {
        return this._col;
    }

    /**
     * Add two positions
     * @param {Position} pos1 First position
     * @param {Position} pos2 Second position
     * @returns {Position} Sum of the two positions
     */
    public static add(pos1: Position, pos2: Position): Position {
        return new Position(pos1._row + pos2._row, pos1._col + pos2._col);
    }

    /**
     * Add two positions
     * @param {Position} pos Position
     * @returns {Position} Sum of the two positions
     */
    public static addCoords(pos: Position, rows: number, cols: number): Position {
        return new Position(pos._row + rows, pos._col + cols);
    }

    public static addRows(pos: Position, rows: number): Position {
        const newP = pos.clone();
        newP.addRows(rows);
        return newP;
    }

    public static addCols(pos: Position, cols: number): Position {
        const newP = pos.clone();
        newP.addCols(cols);
        return newP;
    }

    public set(row: number, col: number): void {
        this._row = row;
        this._col = col;
    }

    /**
     * Add more rows and columns
     * @param {number} rows Rows to add
     * @param {number} cols Columns to add
     */
    public addCoords(rows: number, cols: number): void {
        this._row += rows;
        this._col += cols;
    }

    /**
     * Add more rows
     * @param {number} rows Rows added
     */
    public addRows(rows: number): void {
        this._row += rows;
    }

    /**
     * Add more columns
     * @param {number} cols Columns to add
     */
    public addCols(cols: number): void {
        this._col += cols;
    }

    /**
     * Test the equality with another position
     * @param {Position} other Other position
     * @returns {boolean} Equality of the two positions
     */
    public equals(other: Position): boolean {
        return this._row === other._row && this._col === other._col;
    }

    /**
     * Clone a position
     * @returns {Position} Position
     */
    public clone(): Position {
        return new Position(this._row, this._col);
    }

    /**
     * @returns {string} String representation
     */
    public toString(): string {
        return `(${this._row},${this._col})`;
    }
}

export {Position};
