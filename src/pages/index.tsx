import React from "react";
import {ChessboardPage} from "./chessboardPage";

/**
 * Home page
 */
class Index extends React.Component<{}, {}> {
    public override render(): React.ReactNode {
        return <ChessboardPage/>;
    }
}

export {Index};
