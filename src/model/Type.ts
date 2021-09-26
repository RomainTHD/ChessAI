import {Color} from "model";

/**
 * Piece type
 */
enum Type {
    Bishop,
    King,
    Knight,
    Pawn,
    Queen,
    Rook,
}

/**
 * Hack, used for object key
 * @see Type
 */
type TypeAsKey = Type | number;

/**
 * Type to string
 * @param {Type} type Type
 * @returns {string} Type as a string
 */
function typeToString(type: Type): string {
    switch (type) {
        case Type.Bishop:
            return "bishop";

        case Type.King:
            return "king";

        case Type.Knight:
            return "knight";

        case Type.Pawn:
            return "pawn";

        case Type.Queen:
            return "queen";

        case Type.Rook:
            return "rook";

        default:
            throw new Error("No such piece type");
    }
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
    typeToString,
};

export type {TypeAsKey};
