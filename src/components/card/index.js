import React, { Component } from "react";
import "./style.css"

const shell = window.require('electron').shell;

class Card extends Component {
    constructor(props){
        super(props);  
    }
    openfile(event,path){
        event.stopPropagation()
        shell.openItem(path);
    }
    render() {
        let file = this.props.data
        let name = file.Name
        let index = name.lastIndexOf('.');
        let total = name.length;
        let nameFinal = name.substr(0,index);
        let extention = name.substr(index+1,total-index);
        return (

        <div style={{backgroundColor:"#1b2838",height:200, borderRadius:10,padding:10, margin:10,boxShadow: "0px 0px 15px rgba(0,0,0,0.15)"}} key="key1" onClick={()=>this.props.modal()}>
            <h3 style={{color:"white"}}>{nameFinal}</h3>

            <div style={{height:2,width:30, backgroundColor:"red"}}></div>
            
            <div onClick={(e)=>this.openfile(e,file.Path)}  className="openFileButton">
                <span style={{color:"red"}}>{"ouvrir"}</span>
            </div>
            <div style={{bottom:30, position:"absolute",color:"white",right:20}}>
                {extention}
            </div>
        </div>
        );
    }
}

export default Card;