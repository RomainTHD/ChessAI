import {
    PieceComponentProps,
    PieceComponentState,
} from "contexts/pieceComponent";
import React from "react";
import "styles/pieceComponent.scss";

/**
 * Piece component
 */
class PieceComponent extends React.Component<PieceComponentProps, PieceComponentState> {
    public constructor(props: PieceComponentProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    public override render(): React.ReactNode {
        let content = null as React.ReactNode;

        if (this.props.piece !== null) {
            content = (
                <img
                    className={"piece--content"}
                    src={`/assets/pieces/${this.props.piece.color}/${this.props.piece.type}.svg`}
                    alt={this.props.piece.getFEN()}
                />
            );
        }

        const isHovered     = this.state.isHovered;
        const canBeOccupied = this.props.canBeOccupied;
        let activeColor     = this.props.piece?.color === this.props.chessboard.activeColor;

        if (this.props.chessboard.opponent !== null) {
            activeColor = activeColor && this.props.chessboard.player.ownColor === this.props.piece?.color;
        }

        return (
            <td
                className={
                    "piece " +
                    `${(isHovered && activeColor) || canBeOccupied ? "piece--clickable" : ""} ` + // Clickable
                    `piece--color-${this.props.backgroundColor} ` + // Piece background color
                    `piece--hovered-${this.state.isHovered} ` + // Hovered by the cursor
                    `piece--occupation-${this.props.canBeOccupied && !this.props.canBeTaken} ` + // Piece can move here
                    `piece--taken-${this.props.canBeTaken} ` // Piece can move here by taking another piece
                }
                onMouseEnter={() => this.setState({
                    isHovered: true,
                })}
                onMouseLeave={() => this.setState({
                    isHovered: false,
                })}
                onClick={() => this.props.onClick()}
            >
                {content}
            </td>
        );
    }
}

export {PieceComponent};
