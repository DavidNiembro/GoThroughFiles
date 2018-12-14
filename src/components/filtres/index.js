import React, { Component } from "react";
import "./style.css";
import Switch from 'react-toggle-switch';

class Filtres extends Component {

    render() {
        return (
            <div className="filtreFrame" style={{height:this.props.heightFiltre}}>
                <div style={{paddingLeft:15}}>
                    <div className="splitLineFiltre"></div>
                    <h2 style={{color: "gray", paddingTop:10}}>Filtres / recherche avancée</h2>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <Switch onClick={this.props.toggleSwitch} on={this.props.switched}/>
                        <span style={{color: "gray", paddingLeft:20, paddingTop:10}}>Recherche dans le contenu</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filtres;