import {PieceComponent} from "components/pieceComponent";
import {
    ChessboardComponentProps,
    ChessboardComponentState,
} from "contexts/chessboardComponent";
import {
    Color,
    Piece,
    Position,
    Type,
} from "model";
import {
    Player,
    RandomMove,
} from "model/Opponent";
import React from "react";
import {Table} from "react-bootstrap";

/**
 * Chessboard component
 */
class ChessboardComponent extends React.Component<ChessboardComponentProps, ChessboardComponentState> {
    public constructor(props: ChessboardComponentProps) {
        super(props);

        const chessboard = this.props.chessboard;

        this.state = {
            chessboard,
            selectedMoves: [],
            selectedPiece: null,
        };

        // Change opponent here
        chessboard.setFirstOpponent(new Player(this.state.chessboard));
        chessboard.setSecondOpponent(new RandomMove(this.state.chessboard));
    }

    public override componentDidMount(): void {
        // Set board updated callback
        this.state.chessboard.addUpdateListener(() => {
            this.setState({
                chessboard: this.state.chessboard,
            });
        });

        this.state.chessboard.start().then();
    }

    public override render(): React.ReactNode {
        const rows = [] as React.ReactNode[];

        for (let row = this.state.chessboard.NB_ROWS - 1; row >= 0; --row) {
            const cells = [] as React.ReactNode[];

            for (let col = 0; col < this.state.chessboard.NB_COLS; ++col) {
                cells.push(this._renderCell(new Position(row, col)));
            }

            rows.push((
                <tr key={row}>
                    {cells}
                </tr>
            ));
        }

        return (
            <Table
                className={"table text-center"}
                bordered={true}
                hover={true}
                variant={"dark"}
            >
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }

    private _renderCell(piecePosition: Position): React.ReactNode {
        let canBeOccupied = false;
        let canBeTaken    = false;

        for (const move of this.state.selectedMoves) {
            if (move.position.equals(piecePosition)) {
                canBeOccupied = true;

                if (move.pieceTaken) {
                    canBeTaken = true;
                }

                break;
            }
        }

        const piece = this.state.chessboard.getPiece(piecePosition);

        return (
            <PieceComponent
                key={piecePosition.toString()}
                backgroundColor={(piecePosition.row ^ piecePosition.col) % 2 ? Color.White : Color.Black}
                canBeOccupied={canBeOccupied}
                canBeTaken={canBeTaken}
                chessboard={this.state.chessboard}
                onClick={() => this._onClick(piecePosition, piece)}
                piece={piece}
            />
        );
    }

    private _highlightClickedPiece(clickedPiece: Piece): void {
        // We check if the player wants to see the available moves of one of its pieces
        if (clickedPiece.equals(this.state.selectedPiece)) {
            this.setState({
                selectedMoves: [],
                selectedPiece: null,
            });
        } else {
            this.setState({
                selectedMoves: clickedPiece.getLegalMoves(),
                selectedPiece: clickedPiece,
            });
        }
    }

    private _playMoveClicked(clickPosition: Position): boolean {
        // We check if the player selected a move to play
        for (const move of this.state.selectedMoves) {
            if (move.position.equals(clickPosition) && (!move.isPromotion || move.promotionNewType === Type.Queen)) {
                // Auto-queen
                (this.state.chessboard.player as Player).moveSelected(move);

                this.setState({
                    selectedMoves: [],
                    selectedPiece: null,
                });

                return true;
            }
        }

        return false;
    }

    private _onClick(clickPosition: Position, clickedPiece: Piece | null): void {
        let hasPlayed = false;

        if (this.state.selectedPiece !== null) {
            hasPlayed = this._playMoveClicked(clickPosition);
        }

        if (!hasPlayed && clickedPiece !== null && clickedPiece.color === this.state.chessboard.activeColor) {
            this._highlightClickedPiece(clickedPiece);
        }
    }
}

export {ChessboardComponent};
