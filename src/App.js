import React, { Component } from "react";
import "./App.css";
import Main from"./views/Main";
import Path from"./views/Path";
import SplashScreen from "./components/splashScreen/index";

class App extends Component {
    constructor(){
        super();
        this.state = {            
            view : "splash",
            //path : "/users/davidniembro/desktop",
            path : null,

        }
        this.loading()
        this.setPath = this.setPath.bind(this);
    }
    loading(){
        let that = this;
        setTimeout(()=>{
            if(that.state.path==null){
                that.setState({view: "path"})
            }else{
                that.setState({view: "main"})
            }
        },1000)
    }
    setPath($path){
        console.log($path)
        this.setState({path:$path});
        this.setState({view: "main"})
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
                    <Main path={this.state.path}/>
                );
            case "path":
                return (
                    <Path setPath={this.setPath}/>
                );
            default:
                break;
        }
    }
}

export default App;
