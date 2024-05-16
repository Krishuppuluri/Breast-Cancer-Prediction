// AboutUs.js

import React from 'react';
import '../styles/screens/AboutUs.css';
import backgroundImage from '../styles/screens/Bg1.jpg';

const AboutUs = () => {
  return (
    <div className="about-body">
      <div className="content">
        <h1 className="about-h1">eHospital: Where your e-Health Journey Begins..</h1>
        
        <div className="about">
          <p>Welcome to eHospital, where we are dedicated to transforming the healthcare landscape by harnessing the power of cutting-edge technology. Our eHealth system is designed to provide innovative, accessible, and personalized healthcare solutions that empower individuals and healthcare providers to take control of their well-being.</p>
        </div>

        <div className="about">
          <h2>Our Mission</h2>
          <p><i>At eHospital, our mission is to improve the quality, accessibility, and affordability of healthcare through state-of-the-art eHealth solutions. We aim to:</i></p>
          <ol>
            <li className="bullet-point">Empower Patients: We believe that healthcare should be patient-centric. Our eHealth system puts individuals in the driver's seat of their health journey, enabling them to make informed decisions, access their health records, and interact with healthcare professionals seamlessly.</li>
            <li className="bullet-point">Support Health Care Providers: We understand the challenges healthcare professionals face daily. Our eHealth platform is designed to streamline their work, enhance communication, and provide valuable insights that aid in delivering superior patient care.</li>
            <li className="bullet-point">Ensure Data Security: Your health data is precious. We prioritize the highest standards of data security and privacy to ensure that your sensitive information remains confidential and secure.</li>
          </ol>
        </div>

        {/* Additional content sections with similar structure */}

        <div className="about">
          <h2>Why Choose Us?</h2>
          <ol>
            <li className="bullet-point">User Centered Design: We take user feedback seriously, continually improving our platform to ensure it's intuitive and user-friendly.</li>
            <li className="bullet-point">Security and Privacy: We implement rigorous security measures to protect your data, complying with the highest standards in the industry.</li>
            <li className="bullet-point">Experience: With years of experience in the eHealth field, we have a deep understanding of the intricacies of healthcare, ensuring our solutions are tailored to meet the unique needs of both patients and providers.</li>
          </ol>
        </div>

        <div className="about">
          <p><i><strong>"Join us on our journey to redefine healthcare for the digital age. Together, we can shape a healthier and more connected future. At eHospital, your well-being is our priority, and we're committed to being your partner in health."</strong></i></p>
        </div>
      </div>
      <div className="image-container">
        <img src={backgroundImage} alt="Background Illustration" className="image" />
      </div>
    </div>
  );
};

export default AboutUs;
