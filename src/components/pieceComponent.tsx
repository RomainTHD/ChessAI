import {
    PieceComponentProps,
    PieceComponentState,
} from "contexts/pieceComponent";
import {Color} from "model/Color";
import React from "react";
import "styles/pieceComponent.scss";

class PieceComponent extends React.Component<PieceComponentProps, PieceComponentState> {
    public constructor(props: PieceComponentProps) {
        super(props);

        this.state = {
            isActive: false,
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

        return (
            <td
                className={
                    "piece " +
                    `${this.state.isActive && this.props.piece?.color === Color.White ? "piece--clickable" : ""} ` +
                    `piece--color-${this.props.backgroundColor} ` +
                    `piece--active-${this.state.isActive}`
                }
                onMouseEnter={() => this.setState({
                    isActive: true,
                })}
                onMouseLeave={() => this.setState({
                    isActive: false,
                })}
                onClick={() => {
                    if (this.props.piece !== null) {
                        // FIXME: Also work for the other player
                        this._onMouseClick();
                    }
                }}
            >
                {content}
            </td>
        );
    }

    private _onMouseClick(): void {
        console.log(this.props.piece?.getAvailableMoves());
    }
}

export {PieceComponent};
