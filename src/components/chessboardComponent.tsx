import {ChessboardComponentProps} from "contexts/chessboardComponent";
import React from "react";
import {Table} from "react-bootstrap";
import "styles/chessboard.scss";

class ChessboardComponent extends React.Component<ChessboardComponentProps, {}> {
    public render(): React.ReactNode {
        const rows: JSX.Element[] = [];

        for (let row = this.props.chessboard.NB_ROWS - 1; row >= 0; --row) {
            const cells: JSX.Element[] = [];

            for (let col = 0; col < this.props.chessboard.NB_COLS; ++col) {
                cells.push((
                    <td className={`td-${(row ^ col) % 2 ? "white" : "black"}`}>
                        {this.props.chessboard.getPiece(row, col).getFEN()}
                    </td>
                ));
            }

            rows.push((
                <tr>
                    {cells}
                </tr>
            ));
        }

        return (
            <Table
                className={"table text-center"}
                bordered={true}
                hover={true}
            >
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
}

export {ChessboardComponent};
