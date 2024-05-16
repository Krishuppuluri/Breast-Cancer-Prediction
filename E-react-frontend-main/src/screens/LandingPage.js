import React from 'react';
import Header from '../components/Header';
import '../styles/screens/LandingPage.css';
import reactLogo from "./main-image.jpg";

const LandingPage = () => {
  return (
    <div className="landing-page">
       
       <img src={reactLogo} alt="React Image" /><br></br><br></br><br></br>
       <a href="/searchpatient">Shortcut to Search</a><br></br><br></br>
       <a href="/DBConnection">DB Connection</a><br></br><br></br>
       <a href="/Tasks">Tasks</a><br></br><br></br>
       <a href="/webform">Surgery Feedback Form</a><br></br><br></br>
       <a href="/HealthcareModels">Hub</a><br></br><br></br>
       <a href="/Analytic">Analytic</a><br></br><br></br>

       <a href="/VoiceRecoginition">VoiceRecoginition</a><br></br><br></br>

       <a href="/serviceshomepage">ServicesHomePage</a><br></br><br></br>
      {/*<h1>Welcome to Smart Digital Medicine</h1>
        <p>Your Health, Our Priority</p>*/} 

    </div>




  );
};

export default LandingPage;
