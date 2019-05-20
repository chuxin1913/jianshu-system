import React,{Component,Fragment} from 'react'
import ReactDom from 'react-dom'
import './../node_modules/font-awesome/css/font-awesome.css';
import Header from "page/header/index.jsx"
import {Provider} from "react-redux"
import store from "./store/index.jsx"
const App = (
    <Provider store={store}>
        <Header/>
    </Provider>
)
ReactDom.render(App,document.getElementById('app'))