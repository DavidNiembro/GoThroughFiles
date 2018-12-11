import React, { Component } from "react";
import InputBar from "../components/inputBar"
import Button from "../components/button"

const electron = window.require('electron');
const remote = electron.remote;
const dialog = remote.dialog;

class Settings extends Component {

    constructor(props){
        super(props);
        this.state= {
            path: ""
        }
        this.changePath = this.changePath.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.persistPath = this.persistPath.bind(this);
    }

    /**
     * 
     */
    componentDidMount(){
        this.setState({path:this.props.path})
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
     */
    persistPath(){
        this.props.setPath(this.state.path);
    }

    render() {
        return (
            <div>
                <div style={{height:80, backgroundColor:"#1b2838", alignContent:"center", justifyContent:"center",flex:1, paddingLeft:40, marginTop:"40px"}}>
                    <span style={{color:"white",fontSize:40,lineHeight:2}}>Réglage</span>
                </div>
                <div style={{width:"80%", marginLeft:"auto",marginRight:"auto"}}>
                    <h1 style={{color: "white"}}>Changer le chemin</h1>
                    <h3 style={{color:"gray"}}>Choisissez le dossier ou vous voulez que la recherche s'effectue</h3>
                    <div style={{width:"100%", justifyContent:"center",marginBottom:20}}>
                        <InputBar stringChange={this.changePath} search={this.state.path}/>
                    </div>
                    <Button search={this.openDialog} text={"Selectionner"}/>
                </div>

                <div style={{bottom:20, display:"flex", width:"100%", justifyContent:"flex-end", position:"absolute", right:"20px"}}>
                    <Button search={this.persistPath} text={"Annuler"}/>
                    <Button search={this.persistPath} text={"Suivant"}/>
                </div>
            </div>
        );
    }
}

export default Settings;
