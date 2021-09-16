import {
    PieceComponentProps,
    PieceComponentState,
} from "contexts/pieceComponent";
import React from "react";
import "styles/pieceComponent.scss";

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
            activeColor = activeColor && this.props.chessboard.playerColor === this.props.piece?.color;
        }

        return (
            <td
                className={
                    "piece " +
                    `${(isHovered && activeColor) || canBeOccupied ? "piece--clickable" : ""} ` +
                    `piece--color-${this.props.backgroundColor} ` +
                    `piece--active-${this.state.isHovered} ` +
                    `piece--occupation-${this.props.canBeOccupied && !this.props.canBeTaken} ` +
                    `piece--taken-${this.props.canBeTaken} `
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
