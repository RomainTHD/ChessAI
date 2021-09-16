import {ChessboardComponent} from "components/chessboardComponent";
import {Chessboard} from "model";
import {RandomMove} from "model/Opponent/RandomMove";
import React from "react";
import "styles/chessboardPage.scss";

class ChessboardPage extends React.Component<{}, {}> {
    public override render(): React.ReactNode {
        const FEN        = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -";
        const chessboard = new Chessboard(FEN, RandomMove);

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
