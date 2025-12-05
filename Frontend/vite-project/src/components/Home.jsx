import React from 'react'
import Nav from "./Nav";
import Part from "./Part"
import {useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Home() {
    const navigate=useNavigate();
     useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/main");
        }
    }, []);
    return (
        <div>
            <div className="container">
                <Nav />
                <Part />
    
            </div>
        </div>
    )
}
