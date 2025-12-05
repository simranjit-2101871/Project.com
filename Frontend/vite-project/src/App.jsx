import React from "react";
import "./App.css";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Log from "./components/Log";
import Home from "./components/Home";
import Register from "./components/Register";
import Main from "./components/Main"
import Profile from "./components/Profile";
import About from "./components/About";
import Groups from "./components/Groups";

const App = () => {
  //const navigate=useNavigate();
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Log />}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/main" element={<Main/>}></Route>
          <Route path="/main/:boolInvite" element={<Main/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/groups" element={<Groups/>}></Route>
        </Routes>
      </Router>
  );
};

export default App;

