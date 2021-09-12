import React from "react";
import "./App.css";
import logo from "./logo.svg";

class App extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        WIP
                    </p>
                </header>
            </div>
        );
    }
}

export {App};
