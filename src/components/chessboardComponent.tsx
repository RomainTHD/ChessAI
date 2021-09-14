import {PieceComponent} from "components/pieceComponent";
import {
    ChessboardComponentProps,
    ChessboardComponentState,
} from "contexts/chessboardComponent";
import {Color} from "model/Color";
import React from "react";
import {Table} from "react-bootstrap";

class ChessboardComponent extends React.Component<ChessboardComponentProps, ChessboardComponentState> {
    public override render(): React.ReactNode {
        const rows = [] as JSX.Element[];

        for (let row = this.props.chessboard.NB_ROWS - 1; row >= 0; --row) {
            const cells = [] as JSX.Element[];

            for (let col = 0; col < this.props.chessboard.NB_COLS; ++col) {
                cells.push((
                    <PieceComponent
                        key={col}
                        backgroundColor={(row ^ col) % 2 ? Color.White : Color.Black}
                        piece={this.props.chessboard.getPiece(row, col)}
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
}

export {ChessboardComponent};
