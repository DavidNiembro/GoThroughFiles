import React, { Component } from "react";
import "./style.css";
import {getDate} from "../../function/functions";
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
        /* Fonction format date */
       const time = getDate()

       const containerClass = this.props.modalOpened ? 'modalContainer modalContainerActive' : 'modalContainer';
       return (
            <div className={containerClass}>
                <div className='modalHeader'>
                    <h1 style={{paddingTop:20}}>{this.props.data && this.props.data.Name}</h1>
                    <span className="close" onClick={()=>this.props.modalToggle()}></span>
                </div>
                <div className='modalBody'>
                    <ul>
                        <li><strong>Taille : </strong> {file && file.meta && file.meta.size}</li>
                        <li><strong>Emplacement: </strong>{file && file.Path}</li>
                        <li><strong>Date de modification : </strong>{file && file.meta && file.meta.mtime}</li>
                        <li><strong>Date de création : </strong>{file && file.meta && file.meta.birthtime}</li>
                    </ul>
                </div>
                <div className="buttonModalOpenFile" onClick={(e)=>this.openfile(e,file.Path)}   > ouvrir le fichier</div>
            </div>
        );
    }
}



export default Modal;
