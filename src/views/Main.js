import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
import Button from "../components/button";
import InputBar from "../components/inputBar";

const {ipcRenderer} = window.require('electron');

class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            datas : null,
            search: ""
        };
        this.searchStringChange = this.searchStringChange.bind(this);
        this.search = this.search.bind(this);
    }

    searchStringChange(e){
        this.setState({search : e.target.value});
    }

    search(){
        let that = this;

        ipcRenderer.send('Search', this.state.search);

        ipcRenderer.once('returnSearch', function(event, response){
            that.setState({datas:response})
        });

    }

    render() {
        
        return (
            <div style={{width:"85%",marginLeft:"auto",marginRight:"auto"}}>
                <div style={{height:70,padding:25}}>
                    <InputBar value={this.state.search} stringChange={this.searchStringChange}/>
                    <Button text={"chercher"} search={this.search}/>
                </div>
                <StackGrid
                    columnWidth={250}
                    gutterWidth={5}
                    >
                    {this.state.datas && this.state.datas.map((data,key)=>{
                        return <Card key={key} data={data}/>
                    })}
                </StackGrid>
            </div>
        );
    }
}

export default Main;
