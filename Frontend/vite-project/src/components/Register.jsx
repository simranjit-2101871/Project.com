import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate();

    const [loginInfo,setInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    

    const handleChange=(e)=>{
        const{name,value}=e.target;
        console.log(name,value);
        setInfo((prevalue)=>({...prevalue,
           //here check the code of the youtbe ones also 57:15
           /* name:e.target.name,
            email:e.target.email,
            password:e.target.password
        *///this is one is static method
        
        //lets try the dynamic one
        [name]: value // Dynamically update the correct field (name, email, or password)
        }))
        console.log(loginInfo);
    
    }
 
    const onSignup= async (e)=>{
        e.preventDefault();
        const{name,email,password}=loginInfo;
        if(!name || !email || !password){
            //later use the tostify here 1:02:35
            console.logk("fill all the fields correctly")
        }
        try{
            const url="http://localhost:8080/auth/Signin";
            const response= await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(loginInfo)
            })
            const result=await response.json();
            const {success,message,error}=result;
            //yeah walla if jo fetch se response ayega usko handle karega
            if(success){
                setTimeout(()=>{
                    navigate('/login')

                },100)
            }else if(error){
                const details=error?.details[0].message
                alert(details);
            }else if(!success){
                alert(message);
            }
        }catch(err){
            alert("error has occured in fetchin the api")
            console.log(err);

        }


    }
    return (
        <div className="container">
            <div className="signup-container">
                <h1>Signup</h1>
                <form onSubmit={onSignup}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input  onChange={handleChange} type="text" name="name" autoFocus placeholder="Enter your name..." />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input  onChange={handleChange}type="email" name="email" placeholder="Enter your email..." />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} type="password" name="password" placeholder="Enter your password..." />
                    </div>
                    <button type="submit" className="signup-button">Signup</button>
                </form>
                <ToastContainer />
            </div>
        </div >
    );
};

export default Signup;
