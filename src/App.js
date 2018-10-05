import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import node_dir from "node-dir";

const axios = require("axios");

class App extends Component {
    constructor() {
        super();
        /*axios
            .get("http://127.0.0.1:8088/")
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
            .then(function() {
            });*/
    
            /*node_dir.readFilesStream(__dirname,
        function(err, stream, next) {
            if (err) throw err;
            var content = '';
            stream.on('data',function(buffer) {
                content += buffer.toString();
            });
            stream.on('end',function() {
                console.log('content:', content);
                next();
            });
        },
        function(err, files){
            if (err) throw err;
            console.log('finished reading files:', files);
        });*/
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
