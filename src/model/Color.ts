/**
 * Piece color
 */
enum Color {
    Black,
    White,
}

/**
 * Hack, used for object key
 * @see Color
 */
type ColorAsKey = Color | number;

/**
 * @param {Color} color Color
 * @returns {Color} Opposite color
 */
function getOppositeColor(color: Color): Color {
    return (color === Color.White) ? Color.Black : Color.White;
}

function colorToString(color: Color): string {
    if (color === Color.Black) {
        return "black";
    } else if (color === Color.White) {
        return "white";
    } else {
        throw new Error("No such color type");
    }
}

export {
    Color,
    colorToString,
    getOppositeColor,
};

export type {ColorAsKey};
