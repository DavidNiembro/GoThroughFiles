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
        if(e.value){
            this.setState({path:e.value})
        }
    }

    /**
     * 
     */
    persistPath(){
        if(this.state.path.length>0){
            this.props.setPath(this.state.path);
        }
        
    }

    render() {
        return (
            <div>
            <div style={{width:"80%", marginLeft:"auto",marginRight:"auto", marginTop:"20vh"}}>
                <h1 style={{color: "white"}}>Choisissez le chemin</h1>
                <h3 style={{color:"gray"}}>Choisissez le dossier ou vous voulez que la recherche s'effectue</h3>
                <div style={{width:"100%", justifyContent:"center",marginBottom:20}}>
                    <InputBar stringChange={this.changePath} search={this.state.path}/>
                </div>
                <Button search={this.openDialog} text={"Selectionner"}/>
            </div>

            <div style={{bottom:20, display:"flex", width:"100%", justifyContent:"flex-end", position:"absolute", right:"20px"}}>
                <Button search={this.persistPath} text={"Suivant"}/>
            </div>
        </div>
        );
    }
}

export default Path;
