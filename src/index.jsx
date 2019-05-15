import React from 'react'
import ReactDom from 'react-dom'
import "./index.css"
import  "./index.scss"
import './../node_modules/font-awesome/css/font-awesome.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; 
ReactDom.render(
    <div>
    <DatePicker></DatePicker>
        <h1 className="hel">123</h1>
    </div>,
    document.getElementById('app')
)