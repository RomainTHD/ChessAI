import React from "react";
import ReactDOM from "react-dom";
import "styles/index.scss";
import {Index} from "./pages";
import {reportWebVitals} from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <Index/>
    </React.StrictMode>,
    document.getElementById("root"),
);

reportWebVitals();
