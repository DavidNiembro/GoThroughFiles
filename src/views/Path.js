import React, { Component } from "react";
import InputBar from "../components/inputBar"
import Button from "../components/button"

const electron = window.require('electron');
const remote = electron.remote;
const dialog = remote.dialog;

class Path extends Component {
    constructor(props){
        super(props)
        this.state={
            path : ""
        }
        this.openDialog = this.openDialog.bind(this);
        this.persistPath = this.persistPath.bind(this);
        this.changePath = this.changePath.bind(this)
    } 
 
    /**
     * 
     */
    openDialog(){
        const properties = ['openDirectory'];
        dialog.showOpenDialog({ properties },(path)=> {
            if(path){
                this.setState({path:path[0]});
            }
        });
    }

    /**
     * 
     * @param {*} e 
     */
    changePath(e){
        this.setState({path:e.value})
    }

    /**
     * 
     */
    persistPath(){
        this.props.setPath(this.state.path);
    }

    render() {
        return (
           <div style={{flex:1}}>
               <div style={{top:"50vh", position:"absolute", width:"100%", justifyContent:"center"}}>
                    <InputBar stringChange={this.changePath} search={this.state.path}/>
               </div>
               <Button search={this.openDialog} text={"Selectionner un chemin"}/>
               <Button search={this.persistPath} text={"Suivant"}/>

           </div>
        );
    }
}

export default Path;
