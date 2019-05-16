import React from 'react'
import ReactDom from 'react-dom'
import "./index.css"
import  "./index.scss"
import "./text.less"
import './../node_modules/font-awesome/css/font-awesome.css';
import { DatePicker } from 'antd';
ReactDom.render(
    <div>
        <DatePicker></DatePicker>
        <h1 className="hel lol">123</h1>
    </div>,
    document.getElementById('app')
)