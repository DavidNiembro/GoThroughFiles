import React, { Component } from "react";
import "./App.css";
import StackGrid from "react-stack-grid";
import Card from "./components/card/index";
var loki = require('lokijs')
var db = new loki('./src/base.json"');
var readdirp = require("./components/readdirp");

const electron = window.require("electron");
const fs = electron.remote.require('fs');

var children = db.addCollection('children')

readdirp({ root: '/users/davidniembro/desktop/', directoryFilter: [ '!.git', '!*modules' ] },
  function(fileInfo) {
   }, function (err, res) {
       res.files.forEach(data => {
        var text = fs.readFileSync(data.fullPath,'utf8')
        children.insert({ Path: data.fullPath.toString(), content: text, Name :data.name })
       });

        var searchRegex = new RegExp("application", 'i');
        let dv = children.find({'content': {'$regex': searchRegex}});
        console.log(dv);
});

class App extends Component {
    render() {
        return (
            <StackGrid
                columnWidth={150}
                gutterWidth={5}
                >
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/> 
                <Card/>
                <Card/>
                <Card/>
                <Card/> 
                <Card/>
                <Card/>
                <Card/>
                <Card/> 
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </StackGrid>
        );
    }
}

export default App;
