import React, { Component } from "react";
const electron = window.require('electron');
const remote = electron.remote;
const dialog = remote.dialog;

class Path extends Component {
    constructor(props){
        super(props)
        this.state={
            path : ""
        }
    } 
    componentDidMount(){
        
    }
    openDialog(){
        const properties = ['openDirectory'];
        dialog.showOpenDialog(
            { properties },
            (path)=> {
                this.setState({path:path});
            }
        );
    }
    changePath(e){
        this.setState({path:e.value})
    }
    render() {
        return (
           <div>
               <input value={this.state.path} onChange={(e) => this.changePath(e)}></input>
               <button onClick={ () => this.openDialog() }>Selectionner un chemin</button>
           </div>
        );
    }
}

export default Path;
