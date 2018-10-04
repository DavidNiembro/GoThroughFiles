import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");

class App extends Component {
    constructor() {
        super();
        axios
            .get("http://127.0.0.1:8088/")
            .then(function(response) {
                // handle success
                console.log(response);
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .then(function() {
                // always executed
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.j</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
