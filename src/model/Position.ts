/**
 * Position
 */
class Position {
    /**
     * Row
     * @type {number}
     */
    public readonly row: number;

    /**
     * Column
     * @type {number}
     */
    public readonly col: number;

    /**
     * Constructor
     * @param {number} row Row
     * @param {number} col Column
     */
    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
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
        return Position.add(this, other);
    }

    /**
     * Create a position with more rows
     * @param {number} rows Rows added
     * @returns {Position} New position
     */
    public addRows(rows: number): Position {
        return this.add(new Position(rows, 0));
    }

    /**
     * Create a position with more columns
     * @param {number} cols Columns added
     * @returns {Position} New position
     */
    public addCols(cols: number): Position {
        return this.add(new Position(0, cols));
    }

    /**
     * Test the equality with another position
     * @param {Position} other Other position
     * @returns {boolean} Equality of the two positions
     */
    public equals(other: Position): boolean {
        return this.row === other.row && this.col === other.col;
    }

    /**
     * @returns {string} String representation
     */
    public toString(): string {
        return `(${this.row},${this.col})`;
    }
}

export {Position};
