import React from "react";
//import "./About.css";
import {  useNavigate } from 'react-router-dom'

const About = () => {
  const navigate=useNavigate();

  const routeToMain=()=>{
    navigate('/main')
  }
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Helping Students <span className="highlight">Build Projects</span> With the Right Team
          </h1>
          <p>Project.com connects students for hackathons, coding contests, and academic projects.</p>
          <button  onClick={routeToMain} className="btn">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="project-illustration.png" alt="Team Collaboration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Project.com?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>🔍 Find Teammates</h3>
            <p>Match with students based on skills.</p>
          </div>
        
          <div className="feature-item">
            <h3>👥 Team Collaboration</h3>
            <p>Work together in real-time.</p>
          </div>
          <div className="feature-item">
            <h3>📜 Project Listings</h3>
            <p>Showcase your projects and find contributors.</p>
          </div>
        </div>
      </section>

      {/* Developer Info */}
      <section className="developer">
        <h2>Meet the Developer</h2>
        <p>👨‍💻 <span className="highlight">Simranjit Singh</span> – A passionate developer dedicated to making collaboration easier for students.</p>
      </section>
    </div>
  );
};

export default About;
