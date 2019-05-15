import React from 'react'
import ReactDom from 'react-dom'
import "./index.css"
import  "./index.scss"
import '../node_modules/font-awesome/css/font-awesome.min.css'
// import 'font-awesome/css/font-awesome.css'
ReactDom.render(
    <div>
        <i className="fa fa-address-book"></i>
        <h1 className="hel">hello</h1>
    </div>,
    document.getElementById('app')
)