import {
    PieceComponentProps,
    PieceComponentState,
} from "contexts/pieceComponent";
import {colorToString} from "model/Color";
import {typeToString} from "model/Type";
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
                    `piece--color-${colorToString(this.props.backgroundColor)} ` + // Piece background color
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
                {this._renderPiece()}
            </td>
        );
    }

    private _renderPiece(): React.ReactNode {
        if (this.props.piece !== null) {
            const color = colorToString(this.props.piece.color);
            const type  = typeToString(this.props.piece.type);

            return (
                <img
                    className={"piece--content"}
                    src={`/assets/pieces/${color}/${type}.svg`}
                    alt={this.props.piece.getFEN()}
                />
            );
        } else {
            return null;
        }
    }
}

export {PieceComponent};
