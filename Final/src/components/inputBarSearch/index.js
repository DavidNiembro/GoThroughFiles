import React, { Component } from "react";
import "./style.css";
import { ClipLoader } from 'react-spinners';

class InputBar extends Component {
    
    render() {
        return (
            <div style={{position:"relative"}}>
                <input className="inputBar" value={this.props.value} onChange={this.props.stringChange} placeholder={"exemple.docx"}></input>
                <div className="buttonFiltre" onClick={()=>this.props.openFiltre()}><span>{this.props.filtre ? "moins de filtres": "plus de filtres"}</span></div>
                <div className="buttonIncludes" style={{width:this.props.widthButton}} onClick={()=>this.props.search()}>
                {this.props.loading ?
                    <div><ClipLoader
                        sizeUnit={"px"}
                        size={20}
                        color={'white'}
                        loading={this.props.loading}
                    /></div>
                    :
                    <span style={{lineHeight:3}}>chercher</span>
                }
                </div>
            </div>
        );
    }
}

export default InputBar;