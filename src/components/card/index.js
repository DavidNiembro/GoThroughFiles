import React, { Component } from "react";

const shell = window.require('electron').shell;
const path = require('path');


class Card extends Component {
    constructor(props){
        super(props);  
    }
    openfile(path){
        console.log(path)
        shell.openItem(path);
    }
    render() {
        let file = this.props.data
        return (

        <div style={{backgroundColor:"grey",height:150, borderRadius:10}} key="key1" onClick={()=>this.openfile(file.Path)}>
            {file.Name}
        </div>
        );
    }
}

export default Card;