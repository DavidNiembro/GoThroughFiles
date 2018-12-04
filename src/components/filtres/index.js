import React, { Component } from "react";
import "./style.css";
import Switch from 'react-toggle-switch';

class Filtres extends Component {
    constructor(props){
        super(props);  
    }

    render() {

        return (
            <div style={{height:this.props.heightFiltre, width:"100%", borderRadius:"25px", backgroundColor:"lightgrey", marginTop:-50,borderRadius:"25px", transition:"all 1s",overflow: "hidden"}}>
                <div style={{paddingLeft:15}}>
                    <div style={{height:1,width:"80%", backgroundColor:"grey",marginTop:50}}></div>
                    <h2 style={{color: "gray", paddingTop:10}}>Filtres / recherche avancée</h2>
                    <Switch onClick={this.props.toggleSwitch} on={this.props.switched}/>
                </div>
            </div>
        );
    }
}

export default Filtres;