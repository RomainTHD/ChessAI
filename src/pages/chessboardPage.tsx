import {ChessboardComponent} from "components/chessboardComponent";
import {Chessboard} from "model";
import React from "react";
import "styles/chessboardPage.scss";

/**
 * Chessboard page
 */
class ChessboardPage extends React.Component<{}, {}> {
    public override render(): React.ReactNode {
        const chessboard = new Chessboard("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -");

        return (
            <div className="chessboard">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <ChessboardComponent
                            chessboard={chessboard}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export {ChessboardPage};
