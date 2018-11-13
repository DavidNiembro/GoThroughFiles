import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
import InputBar from "../components/inputBar/";
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
                    <input style={{outline: "none", height:50, width:"80%",fontSize:30,border:"none", border:"0.5px solid lightgray", borderRadius:25, paddingLeft:25,color:"gray"}} value={this.state.search} onChange={this.searchStringChange}></input>
                    <button style={{ outline:"none", height:55, position:"absolute", width:"15%", marginLeft:"2%", backgroundColor:"#1c81fd", borderRadius:30, color:"white",fontSize:20}} onClick={()=>this.search()}>Chercher</button>
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
