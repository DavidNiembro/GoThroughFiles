import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import Card from "../components/card/index";
import Button from "../components/button";
import InputBar from "../components/inputBarSearch";
import Modal from "../components/modal";
import reglage from "./settings.svg"
import Typing from 'react-typing-animation';
import Filtres from "../components/filtres"
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
            loading:false,
            current:null,
            heightFiltre:50,
            height:70,
            filtre:0
        };
        this.searchStringChange = this.searchStringChange.bind(this);
        this.search = this.search.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.openFiltre = this.openFiltre.bind(this);

    }

    searchStringChange(e){
        if (e.key === 'Enter'){
            this.search();
        }else{
            this.setState({search : e.target.value});
        }
    }

    modalToggle(data) {
        this.setState({modalOpened: !this.state.modalOpened, current:data});
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

    openFiltre(){
        if(this.state.heightFiltre==200){
            this.setState({heightFiltre:50,height:70,filtre:0});
        }else{
            this.setState({heightFiltre:200,height:270,filtre:1});

        }
       
    }

    render() {
        const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover';
        return (
            <div style={{width:"75%",marginLeft:"auto",marginRight:"auto"}}>
                <div style={{position:"absolute",right:10,top:55}}>
                    <div style={{width:40,height:40, cursor:"pointer"}} onClick={()=>this.props.goToPage("settings")}><img style={{width:30}} src={reglage}></img></div>
                </div>

                {this.state.marginHeight == "40vh" &&<div style={{display:"flex", flex:1, width:"75%", alignItems:"center",justifyContent:"center",height:"40vh",position:"absolute",top:20}}>
                     <Typing>
                        <span style={{color:"grey", fontSize:50}}>Tapez un mot pour commencer la recherche</span>
                    </Typing>
                </div>}
                <div style={{height:this.state.height,padding:25,marginTop:this.state.marginHeight,transition:"all 1s"}}>
                    <InputBar 
                        value={this.state.search} 
                        stringChange={this.searchStringChange} 
                        onChange={event => {this.setState({query: event.target.value})}} 
                        search={this.search} 
                        loading={this.state.loading} 
                        widthButton={this.state.widthButton}
                        openFiltre={this.openFiltre}
                        filtre={this.state.filtre}
                        />
                    <Filtres heightFiltre={this.state.heightFiltre} filtre={this.state.filtre}/>
                </div>
                
                {this.state.marginHeight != "40vh" &&
                    <div style={{padding:20, marginTop:10,marginBottom:10}}>
                        <span style={{color:"lightgrey", fontSize:60}}>Il y a {this.state.datas.items.length} résultats</span> 
                    </div>
                }
                <StackGrid
                    columnWidth={250}
                    gutterWidth={5}
                    >
                    {this.state.datas && this.state.datas.items.map((data,key)=>{
                        return <Card key={key} data={data} modal={() =>this.modalToggle(data)}/>
                    })}
                </StackGrid>
                <Modal modalOpened={this.state.modalOpened} data={this.state.current} modalToggle={this.modalToggle}/>
                <div className={coverClass} onClick={this.modalToggle}></div>
            </div>   
        );
    }
}

export default Main;
