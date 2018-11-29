import React, { Component } from "react";
import "./style.css";
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
        /* Fonctions */
        let index = name.lastIndexOf('.');
        let total = name.length;
        let nameFinal = name.substr(0,index);
        let extention = name.substr(index+1,total-index);
        return (


        <div className="Card" key="key1" onClick={()=>this.props.modal()}>

            <h3 style={{color:"white"}}>{nameFinal}</h3>

            <div className="trait"></div>
            



            <div onClick={(e)=>this.openfile(e,file.Path)}  className="openFileButton">
                <span className="openFileText">{"ouvrir"}</span>
            </div>
                <div className="extension">
                {extention}
            </div>
        </div>
        );
    }
}

export default Card;