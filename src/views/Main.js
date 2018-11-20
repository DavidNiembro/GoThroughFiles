import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
import Button from "../components/button";
import InputBar from "../components/inputBar";
import Modal from "../components/modal";

const {ipcRenderer} = window.require('electron');

class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            datas : null,
            search: "",
            modalOpened: false
        };
        this.searchStringChange = this.searchStringChange.bind(this);
        this.search = this.search.bind(this);

        this.modalToggle = this.modalToggle.bind(this);

        this.changePage = this.changePage.bind(this);
    }

    searchStringChange(e){
        this.setState({search : e.target.value});
        this.search();
    }

    modalToggle() {
        console.log("modal");
        this.setState({modalOpened: !this.state.modalOpened});
    }

    search(){
        let that = this;
        if(this.state.search===""||this.state.search===null){
            ipcRenderer.send('Search', this.state.search);

            ipcRenderer.once('returnSearch', function(event, response){
                that.setState({datas:response});
            });
        }
    }

    changePage(){

    }

    render() {
        const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover';
        const containerClass = this.state.modalOpened ? 'modal-container modal-container-active' : 'modal-container';

        return (
            <div style={{width:"85%",marginLeft:"auto",marginRight:"auto"}}>
                <div style={{height:70,padding:25}}>
                    <InputBar value={this.state.search} stringChange={this.searchStringChange}/>
                    <Button text="&#128269;" search={this.search}/>
                    <Button text={"réglage"} search={()=>this.props.goToPage("settings")}/>
                </div>
                <div className={containerClass}>
                    <div className='modal-header'>
                        <h1></h1>
                    </div>
                    <div className='modal-body'>
                    </div>
                    <div className='modal-footer'></div>
                </div>
                <div className={coverClass} onClick={this.modalToggle}></div>

                <StackGrid
                    columnWidth={250}
                    gutterWidth={5}
                    >
                    {this.state.datas && this.state.datas.map((data,key)=>{
                        return <Card key={key} data={data} modal={this.modalToggle}/>
                    })}
                </StackGrid>
            </div>   
        );
    }
}

export default Main;
