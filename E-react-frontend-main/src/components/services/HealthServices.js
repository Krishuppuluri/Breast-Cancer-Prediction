// HealthServices.js
 
import React from 'react';
import { Link } from 'react-router-dom';
import './HealthServices.css';
 
const HealthServiceCard = ({ img, title, description, linkTo }) => {
  return (
<Link to={linkTo} className="services-link">
<div className="services">
<img className="services__image" src={img} alt={title} />
<div className="services__content">
<h2 className="services__title">{title}</h2>
<p className="services__description">{description}</p>
</div>
</div>
</Link>
  );
};
 
const HealthServices = () => {
  return (
<div className="services-container">
<h1 className="page-title">Health Services</h1>
<div className="gradient-line"></div>
 
      <div className="wrapper">
        {/* Doctor Services */}
<HealthServiceCard
          img="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
          title="Doctor Services"
          description="Streamline patient care with virtual consultations, record management, and secure communication. Enhance efficiency and accessibility through a centralized platform for comprehensive healthcare delivery."
          linkTo="/doctorServices"
        />



 
        {/* Patient Services */}
<HealthServiceCard
          img="https://media.istockphoto.com/id/1373659740/photo/shot-of-a-young-doctor-sharing-information-from-his-digital-tablet-with-an-older-patient.jpg?s=2048x2048&w=is&k=20&c=sCBed7h1k3Pefp_RMyQs3Wu7bGsdA41RTuoTLdObAM8="
          title="Patient Services"
          description="Access medical records, schedule virtual appointments, and communicate with healthcare providers. Enjoy personalized, convenient, and secure healthcare services from the comfort of your home, promoting active participation in your well-being."
          linkTo="/patientServices"
        />
</div>
</div>
  );
};
 
export default HealthServices;