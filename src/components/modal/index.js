import React, { Component } from "react";
import "./style.css";
import node_dir from "node-dir";
import SearchInput, {createFilter} from 'react-search-input';
import { Glyphicon, ButtonGroup, Button } from 'react-bootstrap';

import data from '../../base.json';


const KEYS_TO_FILTERS = ['id', 'title'];

class Searchfiles extends Component {


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


                <ButtonGroup>
                    <Button className="button-cog" onClick={this.modalToggle}>
                        <Glyphicon glyph="cog"/>
                    </Button>
                </ButtonGroup>
                <div className={containerClass}>
                    <div className='modal-header'></div>
                    <div className='modal-body'></div>
                    <div className='modal-footer'></div>
                </div>

                <div className={coverClass} onClick={this.modalToggle}></div>
            </div>
            </body>
        )
    }



}



export default Searchfiles;
