import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
import Button from "../components/button";
import InputBar from "../components/inputBarSearch";
import Modal from "../components/modal";
import reglage from "./settings.svg"
import Typing from 'react-typing-animation';

const {ipcRenderer} = window.require('electron');

class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            datas : null,
            search: "",
            modalOpened: false,
            marginHeight:"40vh",
            widthButton: 145,
            loading:false
        };
        this.searchStringChange = this.searchStringChange.bind(this);
        this.search = this.search.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.changePage = this.changePage.bind(this);

    }

    searchStringChange(e){
        this.setState({search : e.target.value});
    }

    modalToggle() {
        this.setState({modalOpened: !this.state.modalOpened});
    }

    search(){
        let that = this;
        if(this.state.search!=="" && this.state.search!==null){
            this.setState({loading: true, widthButton: 48});
            ipcRenderer.send('Search', this.state.search);

            ipcRenderer.once('returnSearch', function(event, response){
                setTimeout(()=>{
                    that.setState({datas:response, marginHeight:20, loading:false, widthButton: 145});
                    },1000)
            });
        }
    }

    changePage(){

    }

    render() {
        const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover';
        const containerClass = this.state.modalOpened ? 'modal-container modal-container-active' : 'modal-container';
        return (
            <div style={{width:"75%",marginLeft:"auto",marginRight:"auto"}}>
                <div style={{position:"absolute",right:10,top:55}}>
                    <div style={{width:40,height:40}} onClick={()=>this.props.goToPage("settings")}><img style={{width:30}} src={reglage}></img></div>
                </div>

                {this.state.marginHeight == "40vh" &&<div style={{display:"flex", flex:1, alignItems:"center",justifyContent:"center",height:"40vh",position:"absolute",top:20}}>
                     <Typing>
                        <span style={{color:"grey", fontSize:50}}>Tapez un mot pour commencer la recherche</span>
                    </Typing>
                </div>}
                <div style={{height:70,padding:25,marginTop:this.state.marginHeight,transition:"all 1s"}}>
                    <InputBar value={this.state.search} stringChange={this.searchStringChange} search={this.search} loading={this.state.loading} widthButton={this.state.widthButton}/>
                    {this.state.datas && ((this.state.datas.items).lenght + " trouvé")}
                </div>
                {this.state.marginHeight != "40vh" &&
                    <div style={{padding:20, marginTop:10,marginBottom:10}}>
                        <span style={{color:"lightgrey", fontSize:60}}>167 résultats</span> 
                    </div>
                }
                <StackGrid
                    columnWidth={250}
                    gutterWidth={5}
                    >
                    {this.state.datas && this.state.datas.items.map((data,key)=>{
                        return <Card key={key} data={data} modal={this.modalToggle}/>
                    })}
                </StackGrid> 
                <div className={containerClass}>
                    <div className='modal-header'>
                        <h1></h1>
                    </div>
                    <div className='modal-body'>
                    </div>
                    <div className='modal-footer'></div>
                </div>
                <div className={coverClass} onClick={this.modalToggle}></div>
            </div>   
        );
    }
}

export default Main;
