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
import {getOppositeColor} from "model/Color";
import {getFENfromType} from "model/Type";

enum MoveResult {
    Occupied,
    Taken,
    OutOfBounds,
}

abstract class Piece {
    public abstract readonly type: Type;
    public readonly board: Chessboard;
    public readonly color: Color;
    private _position: Position;
    private _hasMoved: boolean;

    public constructor(board: Chessboard, color: Color, position: Position) {
        this.board     = board;
        this.color     = color;
        this._position = position;
        this._hasMoved = false;
    }

    public get hasMoved(): boolean {
        return this._hasMoved;
    }

    public get position(): Position {
        return this._position;
    }

    public get row(): number {
        return this.position.row;
    }

    public get col(): number {
        return this.position.col;
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

    public setMoved(): void {
        this._hasMoved = true;
    }

    public revertMoved(oldMovedValue: boolean): void {
        this._hasMoved = oldMovedValue;
    }

    public getFEN(): string {
        return getFENfromType(this.type, this.color);
    }

    public abstract getPseudoLegalMoves(): Move[];

    public getLegalMoves(): Move[] {
        const pseudoLegalMoves = this.getPseudoLegalMoves();
        const legalMoves       = [] as Move[];

        for (const pseudoLegalMove of pseudoLegalMoves) {
            this.board.tryMove(pseudoLegalMove, (board: Chessboard) => {
                let legalMove = true;

                for (const opponentPiece of board.getPieces(getOppositeColor(this.color))) {
                    const opponentMoves = opponentPiece.getPseudoLegalMoves();
                    for (const opponentMove of opponentMoves) {
                        // eslint-disable-next-line
                        board.tryMove(opponentMove, (nextBoard: Chessboard) => {
                            let kingStillAlive    = false;
                            const remainingPieces = nextBoard.getPieces(this.color);
                            for (const remainingPiece of remainingPieces) {
                                if (remainingPiece.type === Type.King) {
                                    kingStillAlive = true;
                                    break;
                                }
                            }

                            if (!kingStillAlive) {
                                legalMove = false;
                            }
                        });

                        if (!legalMove) {
                            break;
                        }
                    }

                    if (!legalMove) {
                        break;
                    }
                }

                if (legalMove) {
                    legalMoves.push(pseudoLegalMove);
                }
            });
        }

        return legalMoves;
    }

    public setNewPosition(newPos: Position): void {
        this._position = newPos;
    }

    protected _addMoveIfAvailable(position: Position, moves: Move[]): MoveResult {
        let result: MoveResult = MoveResult.OutOfBounds;

        if (this.board.isValidPosition(position)) {
            const target = this.board.getPiece(position);
            if (target === null) {
                moves.push(Move.fromPosition(this, position));
                result = MoveResult.Occupied;
            } else if (target.color !== this.color) {
                moves.push(Move.fromPosition(this, position, true));
                result = MoveResult.Taken;
            }
        }

        return result;
    }

    protected _checkStraightLines(direction: Position, moves: Move[], limit = Infinity): void {
        let i = 1;
        while (true) {
            const p   = this.position.add(new Position(i * direction.row, i * direction.col));
            const res = this._addMoveIfAvailable(p, moves);
            if (res !== MoveResult.Occupied) {
                break;
            }

            if (i >= limit) {
                break;
            }

            ++i;
        }
    }
}

export {
    Piece,
    MoveResult,
};
