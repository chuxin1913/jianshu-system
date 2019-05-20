import React,{Component} from 'react'
import ReactDom from 'react-dom'
import './../node_modules/font-awesome/css/font-awesome.css';
import Header from "page/header/index.jsx"
// <Header/>
import store from "../src/store/reducer.jsx"
class App extends Component{
    constructor(){
        super()
        this.state = store.getState();    
    }
    render(){
        return(
            <div>
                <input value={this.state.iptValue}></input>
            </div>
        )
    }
}
ReactDom.render(<App/>,document.getElementById('app'))