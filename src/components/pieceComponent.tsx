import {
    PieceComponentProps,
    PieceComponentState,
} from "contexts/pieceComponent";
import {Color} from "model/Color";
import {Type} from "model/Type";
import React from "react";
import "styles/pieceComponent.scss";

class PieceComponent extends React.Component<PieceComponentProps, PieceComponentState> {
    public constructor(props: PieceComponentProps) {
        super(props);

        this.state = {
            isActive: false,
        };
    }

    public render(): React.ReactNode {
        let content: React.ReactNode = null;

        if (this.props.piece.type !== Type.Empty) {
            content = (
                <img
                    className={"piece--content"}
                    src={`/assets/pieces/${this.props.piece.color}/${this.props.piece.type}.svg`}
                    alt={this.props.piece.getFEN()}
                />
            );
        }

        return (
            <td
                className={
                    "piece " +
                    `${this.state.isActive && this.props.piece.color === Color.White ? "piece--clickable" : ""} ` +
                    `piece--color-${this.props.backgroundColor} ` +
                    `piece--active-${this.state.isActive}`
                }
                onMouseEnter={() => this.setState({
                    isActive: true,
                })}
                onMouseLeave={() => this.setState({
                    isActive: false,
                })}
            >
                {content}
            </td>
        );
    }
}

export {PieceComponent};
