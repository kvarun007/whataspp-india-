import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

import {
    BrowserRouter,
    Routes,
    Route,
    
} from "react-router-dom";


export default function Input(){

    const [inputNum, setInputNum] = useState("");
    const [activeQr, setActiveQr] = useState (null)

    function handleClick(){
        const url = `https://api.whatsapp.com/send/?phone=${inputNum}`
        //console.log(url);
        //window.location.href = url
        setActiveQr("active")
    }

    
    return(
    <>
    <input type="number" placeholder="Enter numbers only" onChange={(e)=>{setInputNum(e.target.value)}}/>
    <button onClick={handleClick}>SUBMIT</button>
    
    {activeQr != null ? <QRCode value="url"/> : null}
    </>)
}