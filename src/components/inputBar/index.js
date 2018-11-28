import React, { Component } from "react";
import "./style.css";
import { ClipLoader } from 'react-spinners';



class InputBar extends Component {
    constructor(props){
        super(props);  
    }
    
    render() {
        return (
            <div style={{position:"relative"}}>
                <input className="inputBar" value={this.props.search} onChange={this.props.stringChange} placeholder={"/Documents/"}></input>
            </div>
        );
    }
}

export default InputBar;