import {PieceComponent} from "components/pieceComponent";
import {
    ChessboardComponentProps,
    ChessboardComponentState,
} from "contexts/chessboardComponent";
import {
    Color,
    Piece,
    Position,
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
                const piecePosition = new Position(row, col);
                let canBeOccupied   = false;
                let canBeTaken      = false;

                for (const move of this.state.selectedMoves) {
                    if (move.position.equals(piecePosition)) {
                        canBeOccupied = true;

                        if (move.pieceTaken) {
                            canBeTaken = true;
                        }
                    }
                }

                const piece = this.state.chessboard.getPiece(piecePosition);
                cells.push((
                    <PieceComponent
                        key={col}
                        backgroundColor={(row ^ col) % 2 ? Color.White : Color.Black}
                        canBeOccupied={canBeOccupied}
                        canBeTaken={canBeTaken}
                        chessboard={this.state.chessboard}
                        onClick={() => this._onClick(piecePosition, piece)}
                        piece={piece}
                    />
                ));
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

    private _onClick(pos: Position, piece: Piece | null): void {
        let hasPlayed = false;

        if (this.state.selectedPiece !== null) {
            // We check if the player selected a move to play
            for (const move of this.state.selectedMoves) {
                if (move.position.equals(pos)) {
                    (this.state.chessboard.player as Player).moveSelected(move);

                    this.setState({
                        selectedMoves: [],
                        selectedPiece: null,
                    });

                    hasPlayed = true;
                    break;
                }
            }
        }

        if (!hasPlayed && piece !== null && piece.color === this.state.chessboard.activeColor) {
            // We check if the player wants to see the available moves of one of its pieces
            if (this.state.selectedPiece === piece) {
                this.setState({
                    selectedMoves: [],
                    selectedPiece: null,
                });
            } else {
                this.setState({
                    selectedMoves: piece.getLegalMoves(),
                    selectedPiece: piece,
                });
            }
        }
    }
}

export {ChessboardComponent};
