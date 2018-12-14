import React, { Component } from "react";
import "./style.css";
import {getDate, fileSizeSI} from "../../function/functions";
const shell = window.require('electron').shell;

class Modal extends Component {
    
    /**
     * 
     * @param {*} event 
     * @param {*} path 
     */
    openfile(event,path){
        event.stopPropagation()
        shell.openItem(path);
    }

    /**
     * 
     */
    modalToggle() {
        this.setState({modalOpened: !this.props.modalOpened});
    }

    render() {
        let file = this.props.data
        const containerClass = this.props.modalOpened ? 'modalContainer modalContainerActive' : 'modalContainer';
        return (
            <div className={containerClass}>
                <div className='modalHeader'>
                    <h1 style={{paddingTop:40}}>{this.props.data && this.props.data.Name}</h1>
                    <span className="close" onClick={()=>this.props.modalToggle()}></span>
                </div>
                <div className='modalBody'>
                    <ul>
                        <li><strong>Taille : </strong> {fileSizeSI(file && file.stat && file.stat.size)}</li>
                        <li><strong>Emplacement: </strong>{file && file.Path}</li>
                        <li><strong>Date de modification : </strong>{getDate(file && file.stat && file.stat.mtime)}</li>
                        <li><strong>Date de création : </strong>{getDate(file && file.stat && file.stat.birthtime)}</li>
                    </ul>
                </div>
                <div className="buttonModalOpenFile" onClick={(e)=>this.openfile(e,file.Path)}   > Ouvrir le fichier</div>
            </div>
        );
    }
}



export default Modal;
