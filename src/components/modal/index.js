import React, { Component } from "react";
import "./style.css";
import node_dir from "node-dir";
import {getDate} from "../../views/functions";
const shell = window.require('electron').shell;


class Modal extends Component {

    constructor(props) {
        super(props)

    }

    openfile(event,path){
        event.stopPropagation()
        shell.openItem(path);
    }

    modalToggle() {
        this.setState({modalOpened: !this.props.modalOpened});
    }

    render() {
        let file = this.props.data
        /* Fonction format date */
       const time = getDate()

        const containerClass = this.props.modalOpened ? 'modal-container modal-container-active' : 'modal-container';
        return (
            <div className={containerClass}>
                <div className='modal-header'>
                    <h1 style={{paddingTop:20}}>{this.props.data && this.props.data.Name}</h1>
                    <span className="close" onClick={()=>this.props.modalToggle()}></span>
                </div>
                <div className='modal-body'>
                    <ul>
                        <li><strong>Taille : </strong> {file && file.meta && file.meta.size}</li>
                        <li><strong>Emplacement: </strong>{file && file.Path}</li>
                        <li><strong>Date de modification : </strong>{} </li>
                        <li><strong>Date de création : </strong>{}</li>
                    </ul>
                </div>
             
                <div className="buttonModalOpenFile" onClick={(e)=>this.openfile(e,file.Path)}   > ouvrir le fichier</div>
            </div>
        
        )
    }



}



export default Modal;
