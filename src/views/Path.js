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
                this.setState({path:path[0]});
            }
        );
    }
    changePath(e){
        this.setState({path:e.value})
    }

    persistPath(){
        this.props.setPath(this.state.path);
    }
    render() {
        return (
           <div>
               <input style={{border:"none", borderBottom: "1px solid black", width:"70%",height:50, fontSize:25}} value={this.state.path} onChange={(e) => this.changePath(e)}></input>
               <button onClick={ () => this.openDialog() }>Selectionner un chemin</button>
               <button onClick={ () => this.persistPath() }>Suivant</button>

           </div>
        );
    }
}

export default Path;
