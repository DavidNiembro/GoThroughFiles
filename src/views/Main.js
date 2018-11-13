import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
import Button from "../components/button"
import InputBar from "../components/inputBar"

var loki = require('lokijs')
var db = new loki('../base.json');
var readdirp = require("../components/readdirp/readdirp");

const electron = window.require("electron");
const fs = electron.remote.require('fs');

var children = db.addCollection('children')


class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            datas : null,
            search: ""
        }
        this.searchStringChange = this.searchStringChange.bind(this);
        this.search = this.search.bind(this);
    }
    componentDidMount(){
        readdirp({ root: this.props.path, directoryFilter: [ '!.git', '!*modules' ] },
        function(fileInfo) {
         }, function (err, res) {
             res.files.forEach(data => {
              var text = fs.readFileSync(data.fullPath,'utf8')
              children.insert({ Path: data.fullPath.toString(), content: text, Name :data.name })
             });
      });       
    }
    searchStringChange(e){
        this.setState({search : e.target.value});
    }

    search(){
        let that = this;
        var searchRegex = new RegExp(this.state.search, 'i');
        let dv = children.find({'content': {'$regex': searchRegex}});
        that.setState({datas:dv})
    }

    render() {
        
        return (
            <div style={{width:"85%",marginLeft:"auto",marginRight:"auto"}}>
                <div style={{height:70,padding:25}}>
                    <InputBar value={this.state.search} stringChange={this.searchStringChange}/>
                    <Button text={"chercher"} search={this.search}/>
                </div>
                <StackGrid
                    columnWidth={250}
                    gutterWidth={5}
                    >
                    {this.state.datas && this.state.datas.map((data,key)=>{
                        return <Card key={key} data={data}/>
                    })}
                </StackGrid>
            </div>
        );
    }
}

export default Main;
