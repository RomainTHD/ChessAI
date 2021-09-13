import {PieceComponentProps} from "contexts/pieceComponent";
import {PieceType} from "model/PieceType";
import React from "react";
import "styles/piece.scss";

class PieceComponent extends React.Component<PieceComponentProps, {}> {
    public render(): React.ReactNode {
        if (this.props.piece.type === PieceType.Empty) {
            return null;
        } else {
            return (
                <img
                    className={"piece"}
                    src={`/assets/pieces/${this.props.piece.color}/${this.props.piece.type}.png`}
                    alt={this.props.piece.getFEN()}
                />
            );
        }
    }
}

export {PieceComponent};
