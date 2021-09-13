import {ChessboardComponent} from "components/chessboardComponent";
import {Chessboard} from "model/Chessboard";
import React from "react";
import "styles/chessboardPage.scss";

class ChessboardPage extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <div className="chessboard">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <ChessboardComponent
                            chessboard={new Chessboard()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export {ChessboardPage};
