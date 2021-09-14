import assert from "assert";
import {
    Bishop,
    Chessboard,
    Color,
    King,
    Knight,
    Move,
    Pawn,
    Position,
    Queen,
    Rook,
    Type,
} from "model";

abstract class Piece {
    public abstract readonly type: Type;

    public readonly board: Chessboard;
    public readonly color: Color;
    public readonly position: Position;

    public constructor(board: Chessboard, color: Color, position: Position) {
        this.board    = board;
        this.color    = color;
        this.position = position;
    }

    public static createFromFEN(FEN: string, board: Chessboard, position: Position): Piece {
        assert(/[bknpqr]/i.test(FEN), "Wrong FEN");

        const color = /[bknpqr]/.test(FEN) ? Color.White : Color.Black;
        let piece: Piece;

        switch (FEN.toLowerCase()) {
            case "b":
                piece = new Bishop(board, color, position);
                break;

            case "k":
                piece = new King(board, color, position);
                break;

            case "n":
                piece = new Knight(board, color, position);
                break;

            case "p":
                piece = new Pawn(board, color, position);
                break;

            case "q":
                piece = new Queen(board, color, position);
                break;

            case "r":
                piece = new Rook(board, color, position);
                break;

            default:
                throw new Error("Unknown FEN value");
        }

        return piece;
    }

    public getFEN(): string {
        let FEN = this.type.FEN;

        if (this.color === Color.White) {
            FEN = FEN.toUpperCase();
        } else {
            FEN = FEN.toLowerCase();
        }

        return FEN;
    }

    protected _addMoveIfAvailable(position: Position, moves: Move[]): void {
        if (this.board.isValidPosition(position)) {
            const target = this.board.getPiece(position);
            if (target === null) {
                moves.push(Move.fromPosition(this, position));
            } else if (target.color !== this.color) {
                moves.push(Move.fromPosition(this, position, true));
            }
        }
    }

    public abstract getAvailableMoves(): Move[];
}

export {Piece};
