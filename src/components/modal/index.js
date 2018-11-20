import React, { Component } from "react";
import "./style.css";
import node_dir from "node-dir";





class Modal extends Component {


    constructor(props) {
        super(props)

        this.state = {
            modalOpened: false
        }
        this.modalToggle = this.modalToggle.bind(this)

    }

    modalToggle() {
        this.setState({modalOpened: !this.state.modalOpened})
    }


    render() {

        const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover';
        const containerClass = this.state.modalOpened ? 'modal-container modal-container-active' : 'modal-container';
        return (
            <body>
            <div>
                <div className={containerClass}>
                    <div className='modal-header'></div>
                    <div className='modal-body'>
                        <p>sdfkjsdklfjdskfjdsklfjs</p>
                    </div>
                    <div className='modal-footer'></div>
                </div>

                <div className={coverClass} onClick={this.modalToggle}></div>
            </div>
            </body>
        )
    }



}



export default Modal;
