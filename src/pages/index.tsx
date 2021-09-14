import React from "react";
import {ChessboardPage} from "./chessboardPage";

class Index extends React.Component<{}, {}> {
    public override render(): JSX.Element {
        return <ChessboardPage/>;
    }
}

export {Index};
