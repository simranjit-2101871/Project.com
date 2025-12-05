import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Log from './Log'

export default function Part() {
    const navigate = useNavigate()
    const sign = () => {
        navigate("/login")
    }
    const register=()=>{
        navigate("/register");
    }



    return (
        <>
                <div className="content">
                    <div className="text-section">
                        <h1>Welcome to your project community</h1>
                        <button className="google-btn">Continue with Google</button>
                        <button className="microsoft-btn">Continue with Microsoft</button>
                        <button className="email-btn" onClick={sign} >Sign in with Email</button>


                        <p>
                            New to project.com? <a href="#"onClick={register}>Register</a>
                        </p>
                    </div>

                    <div className="image-section">
                        <img src="./src/assets/teamwork.jpg" alt="Teamwork Illustration" />
                    </div>
                   

                </div >



        </>

    )
}
