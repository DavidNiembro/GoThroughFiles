import React, { Component } from "react";
import Main from"./Search";
import Path from"./Path";
import Settings from"./Settings";
import SplashScreen from "../components/splashScreen/index";

const {ipcRenderer} = window.require('electron');

class App extends Component {
    constructor(){
        super();
        this.state = {            
            view : "splash",
            path : null,
        };
        this.setPath = this.setPath.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    /**
     * 
     */
    componentDidMount(){
        let that = this;
        ipcRenderer.once('databasePath', function(event, path){
            console.log(path)
            that.setState({path:path});
            setTimeout(()=>{
                if(that.state.path==null){
                    that.setState({view: "path"})
                }else{
                    that.setState({view: "main"})
                }
            },1000)
        });
        ipcRenderer.send('getPath');
    }
    
    /**
     * 
     * @param {*} path 
     */
    setPath(path){
        let that = this;
        ipcRenderer.once('sendPath', function(event, response){
            that.setState({path:response});
            that.setState({view: "main"})
       });
       ipcRenderer.send('setPath', path);
    }

    /**
     * 
     * @param {*} newPage 
     */
    goToPage(newPage){
        this.setState({view:newPage});
    }

    render() {
        let view = this.state.view;
        switch(view){
            case "splash":
                return (
                    <SplashScreen/>
                );
            case "main":
                return (
                    <Main path={this.state.path} goToPage={this.goToPage}/>
                );
            case "path":
                return (
                    <Path setPath={this.setPath} />
                );
            case "settings":
                return(
                  <Settings setPath={this.setPath} path={this.state.path}/>
                );
            default:
                break;
        }
    }
}

export default App;
