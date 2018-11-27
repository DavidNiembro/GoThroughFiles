import React, { Component } from "react";
import "./style.css";

class InputBar extends Component {
    constructor(props){
        super(props);  
    }
    
    render() {
        return (
            <input className="inputBar" value={this.props.search} /*onChange={this.props.stringChange} */ onKeyPress={this.props.stringChange}  placeholder={"exemple.docx"}></input>
        );
    }
}

export default InputBar;