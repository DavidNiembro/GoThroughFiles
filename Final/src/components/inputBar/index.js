import React, { Component } from "react";
import "./style.css";


class InputBar extends Component {
    
    render() {
        return (
            <div style={{position:"relative"}}>
                <input className="inputBar" value={this.props.search} onChange={this.props.stringChange} placeholder={"/Documents/"}></input>
            </div>
        );
    }
}

export default InputBar;