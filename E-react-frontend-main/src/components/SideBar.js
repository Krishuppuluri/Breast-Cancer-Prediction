// Sidebar.js

import React from 'react';
import '../styles/components/SideBar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>
      &#x2715;{/* Unicode character for the "x" close button */}
    </button>
      <ul>
        <li><a href="/LogIn">Log In</a></li>
        <li><a href="/searchpatient">Search Patient</a></li>
        <li><a href="/serviceshomepage">Services Home Page</a></li>
        <li><a href="/webform">Surgery Feedback Form</a></li>
        <li><a href="/emergencylocations">Emergency Locations</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;