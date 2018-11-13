import React, { Component } from "react";
import styles from "./style.css";

class InputBar extends Component {
    constructor(props){
        super(props);  
    }
    
    render() {
        return (
            <input styleName={styles.inputBar} value={this.props.search} onChange={this.props.searchStringChange}></input>
        );
    }
}

export default InputBar;