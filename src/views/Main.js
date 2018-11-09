import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
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
    }
    componentDidMount(){
        let that = this;
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
        this.setState({search:e.value});
    }

    search(){
        let that = this;
        var searchRegex = new RegExp(this.state.search, 'i');
        let dv = children.find({'content': {'$regex': searchRegex}});
        console.log(dv);
        that.setState({datas:dv})
    }

    render() {
        
        return (
            <div>
                <div>
                    <input value={this.state.search} onChange={(e) => this.searchStringChange(e)}></input>
                    <button onClick={()=>this.search()}></button>
                </div>
                <StackGrid
                    columnWidth={150}
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
