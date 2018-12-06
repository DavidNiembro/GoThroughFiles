import React, { Component } from "react";
import "./style.css";

class Button extends Component {

    render() {
        return (
            <button className="buttonBleu" onClick={()=>this.props.search()}>{this.props.text}</button>
        );
    }
}

export default Button;