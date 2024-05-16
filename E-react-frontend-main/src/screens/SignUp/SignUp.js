import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp()  {
    return (
        <div className="registration-container">
        <div className="fadeIn">
        <h1 className='ma2 mt3 f1 '>REGISTER</h1>
        <h1 className='ma5 f3'>Choose from a range of services that we offer</h1>
        
        <div className="service-list ">
          
          <div className="grow mr4 shadow-5 b--dark-gray br4 b--black-10 ba bg-white-50 ">
            <div className="service-card">
              <div className="service-icon grow">
                <span class="material-symbols-outlined">
                personal_injury
                </span>
              </div>
              <h2 className='ma2'>Patient</h2>
              <p>Register as a patient to schedule appointments, access medical history, and communicate with doctors.</p>
              <Link to="/PatientRegistration">
              <button className="service-button">Register</button>
              </Link>
            </div>
          </div>
          
          <div className="grow mr4 shadow-5 b--dark-gray br4 b--black-10 ba  bg-white-50 ">
            <div className="service-card">
              <div className="service-icon grow">
              <span class="material-symbols-outlined">
                respiratory_rate
              </span>
              </div>
              <h2 className='ma2'>Doctor</h2>
              <p>Register as a doctor to offer medical services, view patient information, and manage appointments.</p>
              <Link to="/DoctorRegistration">
              <button className="service-button">Register</button>
              </Link>
            </div>
          </div>
          
      <div className="grow shadow-5 b--dark-gray br4 b--black-10 ba  bg-white-50 ">
        <div className="service-card">
          <div className="service-icon grow">
          <span class="material-symbols-outlined">
            home_health
          </span>
          </div>
          <h2 className='ma2'>Hospital</h2>
          <p>Register your hospital to provide medical services and manage patient records.</p>
          <Link to="/HospitalAdminRegistration">
          <button className="service-button">Register</button>
          </Link>
        </div>
      </div>

          <div className="grow mr4 mt4 shadow-5 b--dark-gray br4 b--black-10 ba  bg-white-50 ">
            <div className="service-card">
              <div className="service-icon grow">
              <span class="material-symbols-outlined">
                biotech
              </span>
              </div>
              <h2 className='ma2'>Lab</h2>
              <p>Register for laboratory tests to diagnose and monitor your health conditions.</p>
              <Link to="/LabAdminRegistration">
              <button className="service-button">Register</button>
              </Link>
            </div>
          </div>

          <div className="grow mt4 shadow-5 b--dark-gray br4 b--black-10 ba  bg-white-50 ">
            <div className="service-card">
              <div className="service-icon grow">
              <span class="material-symbols-outlined">
                event_available
              </span>
              </div>
              <h2 className='ma2'>Lab Test Appointment</h2>
              <p className='f5'>Fill out the form to promptly schedule an appointment for a lab test or procedure.</p>
              <Link to="/LabApp">
              <button className="service-button">Register</button>
              </Link>
            </div>
          </div>
          
        </div>
        </div>
      </div>
    );
}


export default SignUp;

