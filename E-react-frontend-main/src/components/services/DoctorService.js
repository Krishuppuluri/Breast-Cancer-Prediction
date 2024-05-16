import React from 'react';
import './ServicePage.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faCalendar, faAmbulance, faStethoscope,faDatabase, faUserPlus, faMoneyCheckDollar, faBookMedical } from '@fortawesome/free-solid-svg-icons';

const DoctorService = () => {
  

  return (
    
    <div className="services-container1">
      <h1 className="page-title">Doctor Services </h1> 
      <center><div class="gradient-line"></div></center>
      <br></br>

      <section className="service-section1">
        <FontAwesomeIcon icon={faDatabase} className="service-icon" size="2x" />
        <h2>Electronic Health Records (EHR):</h2>
        <p>
         Offer a digital platform for maintaining and accessing electronic health records, facilitating efficient record-keeping and improving patient care coordination.
        </p>
        <div className="chatbot-container">
          {/* Add a chatbot component or interface here */}
          {/* <p>This is where the chatbot component or interface will be placed.</p> */}
        </div>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>

      <section className="service-section1">
        <FontAwesomeIcon icon={faCalendar} className="service-icon" size="2x" />
        <h2>Managing Appointments:</h2>
        <p>
        Empower doctors to schedule patient appointments online, reducing administrative tasks and enhancing efficiency in healthcare delivery
        </p>
        <div className="chatbot-container">
          {/* Add a chatbot component or interface here */}
          {/* <p>This is where the chatbot component or interface will be placed.</p> */}
        </div>
        <br></br>
        <button className="service-button">Book Appointment</button>
      </section>
     



      

      <section className="service-section1">
        <FontAwesomeIcon icon={faUserPlus} className="service-icon" size="2x"  />
        <h2> Referral Network:</h2>
        <p>
        Establish a network that facilitates referrals among healthcare professionals, promoting collaboration and comprehensive patient care.
        </p>
        {/* <div className="phone-service-info">
          <p>Call us at: +1-123-456-7890</p>
          <p>Email us at: info@ehospital.com</p>
        </div> */}
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
  

      <section className="service-section1">
        <FontAwesomeIcon icon={faStethoscope} className="service-icon" size="2x" />
        <h2>Integration with Diagnostic Labs:</h2>
        <p>
        Connect with diagnostic labs for seamless test ordering, results retrieval, and collaboration in patient diagnostics.
         </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>

      <section className="service-section1">
        <FontAwesomeIcon icon={faAmbulance} className="service-icon" size="2x" />
        <h2>Emergency Consultation Services:</h2>
        <p>
        Provide a mechanism for doctors to offer emergency consultations or advice through the platform for urgent medical situations.

        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>


      <section className="service-section1">
        <FontAwesomeIcon icon={faBookMedical} className="service-icon" size="2x" />
        <h2>Continuing Medical Education (CME) Courses:</h2>
        <p>
        Offer online CME courses to help doctors stay updated with the latest medical advancements and maintain their professional development.
        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>

      <section className="service-section1">
        <FontAwesomeIcon icon={faMoneyCheckDollar} className="service-icon" size="2x"  />
        <h2>Billing and Invoicing:</h2>
        <p>
        Provide tools for easy billing, invoicing, and payment processing, simplifying financial transactions for healthcare services.
        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>

      


      <section className="service-section1">
        <FontAwesomeIcon icon={faComments} className="service-icon" size="2x"  />
        <h2>Feedback and Reviews:</h2>
        <p>
        Incorporate a system for patients to leave feedback and reviews, helping doctors build their online reputation and improve the quality of care.
        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
    </div>
  );
};

export default DoctorService;
