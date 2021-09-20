/**
 * Piece color
 */
enum Color {
    Black = "black",
    White = "white",
}

/**
 * @param {Color} color Color
 * @returns {Color} Opposite color
 */
function getOppositeColor(color: Color): Color {
    return (color === Color.White) ? Color.Black : Color.White;
}

export {
    Color,
    getOppositeColor,
};
