import React from 'react'
import {  useNavigate } from 'react-router-dom'

export default function MainNav() {
  const navigate = useNavigate();

  const makeProfile = () => {
    navigate('/profile');
  }

  const aboutPage = () => {
    navigate('/about');
  }

  const makegroups=()=>{
    navigate('/groups')
  }
  const logout = async () => {
    //localStorage.removeItem("token");
    //localStorage.removeItem("loggedUser");
    localStorage.clear();
    navigate('/');
    alert("user has been loged out");

    /**or
     * ["token", "loggedUser"].forEach(key => localStorage.removeItem(key));
    */

    //this will delete the profile form the mongo and local storage as well the mongo 
    //the registration will also be deleted
    //one cannot make multiple profile from same device ,another profile could be made only after once logout
    try {

      const url = "http://localhost:8080/auth/logoutProfile"
      const response = await fetch(url, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log("response")
      } else {
        console.log("no response");
      }

    } catch (err) {
      alert("Delete try block not eneterd");
    }

    //this try is for delteting the record of user as well
    try {
      console.log("enterd  second try");
      const url = "http://localhost:8080/auth/unRegister"
      const response = await fetch(url, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log("response")
      } else {
        console.log("no response");
      }

    } catch (err) {
      alert("Delete try block not eneterd");
    }
  }


  return (
    <nav className="navbar">
      {/* Left Side: Project.com */}
      <div className="nav-logo">Project.com</div>

      {/* Right Side: Buttons */}
      <div className="nav-links">
        <button onClick={aboutPage}>About</button>
        <button onClick={makeProfile}>Profile</button>
        <button onClick={makegroups}>Group</button>
        <button onClick={logout} className="logout">Logout</button>
      </div>
    </nav>

  )
}
