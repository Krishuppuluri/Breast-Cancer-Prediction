import React from 'react';
import './ServicePage.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPhone, faCalendar, faAmbulance, faVideo, faStethoscope, faHospital } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const PatientService = () => {
  

  return (
    
    <div className="services-container1">
      <h1 className="page-title">Patient Services </h1> 
      <center><div class="gradient-line"></div></center>
      <br></br>
      <section className="service-section1">
        <FontAwesomeIcon icon={faComments} className="service-icon" size="2x" />
        <h2>Medical Chatbot Assistance</h2>
        <p>
        Experience immediate medical guidance with our Chatbot Service. Our AI-powered chatbot is available around the clock to answer your general medical queries, provide information, and offer quick assistance. Get reliable health information at your fingertips.
        </p>
        <div className="chatbot-container">
          {/* Add a chatbot component or interface here */}
          <p>This is where the chatbot component or interface will be placed.</p>
        </div>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
      <section className="service-section1">
        <FontAwesomeIcon icon={faPhone} className="service-icon" size="2x"  />
        <h2>24/7 Medical Helpline</h2>
        <p>
          Call our 24/7 helpline for urgent medical assistance.
        </p>
        <div className="phone-service-info">
          <p>Call us at: +1-123-456-7890</p>
          <p>Email us at: info@ehospital.com</p>
        </div>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
      <section className="service-section1">
        <FontAwesomeIcon icon={faVideo} className="service-icon" size="2x" />
        <h2>Virtual HealthCare Consultation</h2>
        <p>
          Access top-quality healthcare from the comfort of your home. Our Telemedicine Services connect you with experienced healthcare professionals via secure video calls. Get expert medical advice, diagnoses, and prescriptions without leaving your space, ensuring your well-being is just a click away.
         </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
      <section className="service-section1">
        <FontAwesomeIcon icon={faCalendar} className="service-icon" size="2x"  />
        <h2>Find a Medical Specialist</h2>
        <p>
        Discover the perfect specialist for your healthcare needs with our 'Find a Specialist' service. Whether you're seeking expert advice or specialized care, our portal makes it easy to connect with a wide range of medical professionals. Book appointments with confidence and experience personalized, comprehensive healthcare.
        </p>
        <br></br>
        <button className="service-button">Request an Appointment</button>
      </section>
      <section className="service-section1">
        <FontAwesomeIcon icon={faAmbulance} className="service-icon" size="2x" />
        <h2>Emergency Room Care</h2>
        <p>
        Trust our Emergency Room Services for rapid response to life-threatening situations. Our dedicated medical team is equipped to provide immediate care and support for critical injuries and conditions. Your well-being is our urgent priority.
        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
       
      <Link to="/serviceHome" >
      <section className="service-section1">
        <FontAwesomeIcon icon={faStethoscope} className="service-icon" size="2x" />
        <h2>Diagnostic Services</h2>
        <p>
        Experience comprehensive diagnostics at our state-of-the-art facilities. Our diagnostic services offer precise testing and evaluation, aiding in the early detection, diagnosis, and monitoring of health conditions. Trust us to provide accurate insights for informed healthcare decisions.
        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
      </Link>


      <section className="service-section1">
        <FontAwesomeIcon icon={faHospital} className="service-icon" size="2x" />
        <h2>Find a Hospital or Pharmacist</h2>
        <p>
        Easily locate the nearest hospitals and pharmacies with our user-friendly service. Whether you're in need of urgent medical care or simply searching for the nearest pharmacy to pick up your prescriptions, our service helps you find the closest healthcare facilities. With real-time location-based data, you can access contact information, directions, and essential details to ensure you get the care and medications you require without delay. Your health and well-being are our top priority.
        </p>
        <br></br>
        <button className="service-button">Learn More</button>
      </section>
    </div>
  );
};

export default PatientService;
