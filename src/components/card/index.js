import React, { Component } from "react";
const shell = window.require('electron').shell;

class Card extends Component {
    constructor(props){
        super(props);  
    }
    openfile(path){
        shell.openItem(path);
    }
    render() {
        let file = this.props.data
        let name = file.Name
        let index = name.lastIndexOf('.');
        let total = name.length;
        let nameFinal = name.substr(0,index)
        let extention = name.substr(index+1,total-index) 
        return (

        <div style={{backgroundColor:"#1b2838",height:200, borderRadius:10,padding:10, margin:10,boxShadow: "0px 0px 15px rgba(0,0,0,0.15)"}} key="key1" onDoubleClick={()=>this.openfile(file.Path)}>
            <h3 style={{color:"white"}}>{nameFinal}</h3>
            <div style={{height:2,width:30, backgroundColor:"red"}}></div>
            
            <div style={{bottom:20, position:"absolute",color:"white",right:20}}>
                {extention}
            </div>
        </div>
        );
    }
}

export default Card;