enum Color {
    Black = "black",
    White = "white",
}

function getOppositeColor(color: Color) {
    return (color === Color.White) ? Color.Black : Color.White;
}

export {
    Color,
    getOppositeColor,
};
