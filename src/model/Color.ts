/**
 * Piece color
 */
enum Color {
    Black = "black",
    White = "white",
}

/**
 * @param {Color} color Color
 * @returns {Color.Black | Color.White} Opposite color
 */
function getOppositeColor(color: Color) {
    return (color === Color.White) ? Color.Black : Color.White;
}

export {
    Color,
    getOppositeColor,
};
