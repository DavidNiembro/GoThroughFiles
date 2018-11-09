import React, { Component } from "react";

class Card extends Component {
    constructor(props){
        super(props);  
    }
    render() {
        let file = this.props.data
        return (

        <div style={{backgroundColor:"grey",height:150, borderRadius:10}} key="key1">
            {file.Name}
        </div>
        );
    }
}

export default Card;