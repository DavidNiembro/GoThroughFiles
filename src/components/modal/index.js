import React, { Component } from "react";
import "./style.css";
import node_dir from "node-dir";





class Modal extends Component {


    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    modalToggle() {
        this.setState({modalOpened: !this.props.modalOpened});
    }


    render() {

        const containerClass = this.props.modalOpened ? 'modal-container modal-container-active' : 'modal-container';
        return (
            <div className={containerClass}>
                <div className='modal-header'>
                    <h1>{this.props.data && this.props.data.Name}</h1>
                </div>
                <div className='modal-body'>
                    <ul>
                        <li><strong>Type : </strong>{""}</li>
                        <li><strong>Taille : </strong> 20 MB</li>
                        <li><strong>Auteur : </strong>Anel Muminovic </li>
                        <li><strong>Date de modification : </strong> 22.11.2018 </li>
                        <li><strong>Date de création : </strong>10.11.2018</li>
                    </ul>
                </div>
                <div className='modal-footer'>


                </div>

        </div>
        
        )
    }



}



export default Modal;
