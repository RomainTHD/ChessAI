import {Color} from "model";

/**
 * Piece type
 */
enum Type {
    Bishop = "bishop",
    King   = "king",
    Knight = "knight",
    Pawn   = "pawn",
    Queen  = "queen",
    Rook   = "rook",
}

/**
 * Get the FEN of a type and a color
 * @param {Type} type Type
 * @param {Color} color Color
 * @returns {string} FEN
 */
function typeToFEN(type: Type, color: Color): string {
    let FEN: string;

    switch (type) {
        case Type.Bishop:
            FEN = "b";
            break;

        case Type.King:
            FEN = "k";
            break;

        case Type.Knight:
            FEN = "n";
            break;

        case Type.Pawn:
            FEN = "p";
            break;

        case Type.Queen:
            FEN = "q";
            break;

        case Type.Rook:
            FEN = "r";
            break;

        default:
            throw new Error("No such piece type");
    }

    if (color === Color.White) {
        FEN = FEN.toUpperCase();
    }

    return FEN;
}

export {
    Type,
    typeToFEN,
};
