/**
 * Position
 */
class Position extends Array {
    /**
     * Row
     * @type {number}
     */
    public get row(): number {
        return this[0];
    }

    /**
     * Column
     * @type {number}
     */
    public get col(): number {
        return this[1];
    }

    /**
     * Constructor
     * @param {number} row Row
     * @param {number} col Column
     */
    public constructor(row: number, col: number) {
        super(2);
        Object.setPrototypeOf(this, Position.prototype); // Because extending Array, yay to the weird bugs!
        this[0] = row;
        this[1] = col;
    }

    /**
     * Add two positions
     * @param {Position} pos1 First position
     * @param {Position} pos2 Second position
     * @returns {Position} Sum of the two positions
     */
    public static add(pos1: Position, pos2: Position): Position {
        return new Position(pos1.row + pos2.row, pos1.col + pos2.col);
    }

    /**
     * Create another position which is the sum of this position and another one
     * @param {Position} other Position to add
     * @returns {Position} Sum of this position and the other one
     */
    public add(other: Position): Position {
        return new Position(this.row + other.row, this.col + other.col);
    }

    /**
     * Create a position with more rows
     * @param {number} rows Rows added
     * @returns {Position} New position
     */
    public addRows(rows: number): Position {
        return new Position(this.row + rows, this.col);
    }

    /**
     * Create a position with more columns
     * @param {number} cols Columns added
     * @returns {Position} New position
     */
    public addCols(cols: number): Position {
        return new Position(this.row, this.col + cols);
    }

    /**
     * Test the equality with another position
     * @param {Position} other Other position
     * @returns {boolean} Equality of the two positions
     */
    public equals(other: Position): boolean {
        return this.row === other.row && this.col === other.col;
    }
}

export {Position};
