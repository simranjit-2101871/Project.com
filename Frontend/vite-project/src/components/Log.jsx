import React from 'react'
import { useState } from 'react';
import { BrowserRouter as Router,Route,Routes,useNavigate } from "react-router-dom";

export default function Log() {
  const navigate=useNavigate();

    const [logInfo,setInfo]=useState({
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
    console.log(logInfo);

}

const onLogin= async (e)=>{
    e.preventDefault();
    const{email,password}=logInfo;
    if( !email || !password){
        //later use the tostify here 1:02:35
        console.log("fill all the fields correctly")
    }
    try{
        const url="http://localhost:8080/auth/Login";
        const response= await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(logInfo)
        })
        const result=await response.json();
        console.log(result)
        const {success,message,jwtToken,name,error}=result;
        //yeah walla if jo fetch se response ayega usko handle karega
        if(success){
          localStorage.setItem('token',jwtToken);
          localStorage.setItem('loggedUser',name);
            
              setTimeout(()=>{
                navigate('/main')

            },1000)
            

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
    <div>
      <div className="container">
        <div className="signup-container">
          <h1>LogIn</h1>
          <form onSubmit={onLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} type="email" name="email" placeholder="Enter your email..." />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleChange} type="password" name="password" placeholder="Enter your password..." />
            </div>
            <button type="submit" className="signup-button">LogIn</button>
          </form>
        </div>
      </div >
    </div>
  )
}
