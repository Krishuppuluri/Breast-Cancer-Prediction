import React, { useState } from 'react';
import '../styles/screens/Contact.css';
import {useRef} from 'react';
import axios from "axios";


const JoinUs = () => {


  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    Email: '',
    Phone: '',
    Address: '',
    Specialty: '',
    License: '',
    contactMessage: ''
  })

  const [errors, setErrors] = useState({})

  const ref = useRef(null);
  const handleScroll = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      axios.post("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/joinUs", {
        formData
      })
    }

    catch (e) {
      console.log(e);
    }
    const validationErrors = {}
    
    if (!formData.fName.trim()) {
      validationErrors.fName = "Name is required"
    }

    if (!formData.lName.trim()) {
      validationErrors.lName = "Name is required"
    }

    if (!formData.Specialty.trim()) {
      validationErrors.Specialty = "Specialty is required"
    }

    if (!formData.Address.trim()) {
      validationErrors.Address = "Address is required"
    }

  
    if (!formData.Email.trim()) {
      validationErrors.Email = "Email is required"
    } 

    if (!formData.Phone.trim()) {
      validationErrors.Phone = "Phone is required"
    } else if (formData.Phone.length < 10) {
      validationErrors.Phone = "Phone should be at least 10 digits"
    }
    if (!formData.License.trim()) {
      validationErrors.License = "License is required"
    } else if (formData.License.length < 6) {
      validationErrors.License = "License should be at least 6 digits"
    }

    if (!formData.contactMessage.trim()) {
      if (formData.contactMessage.length > 10) {
      validationErrors.contactMessage = "Max length is 20 characters"
    }
  }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully")
      window.location.href = 'https://e-react-frontend-55dbf7a5897e.herokuapp.com/';
    }


  }

  return (
    <div className='contact-container'>
      <div className='row'>
        <div className='col-12 text-center'>
          <div class='contact-heading-two'><h2>Our Joining Process</h2></div>
          <div class='contact-heading-four'><h4>1. Submit the form on the website, and feel free to leave a note if you have any questions.</h4></div>
          <div class='contact-heading-four'><h4>2. Our staff will contact you to book an in-person verification for privacy reason.</h4></div>
          <div class='contact-heading-four'><h4>3. After meeting with you in-person, we will process your application in 7 days.</h4></div>
          <div class='contact-heading-four'><h4>4. You will recieve updates and result of your application through email.</h4></div>
          <div class='contact-heading-four'><h4>5. After approved, we will send you a link to setup your account.</h4></div>
          <div class='contact-heading-four'><h4>6. Welcome to join our platform!  :）</h4></div>
          
          <button onClick={handleScroll} className='submit-btn' type='scroll'>
              Fill out the form
            </button>
            <div ref={ref}>

          <div class='contact-heading-one'><h1>Join Us Today!</h1></div>
          <div class='contact-heading-three'><h3>Let's build smart healthcare together.</h3></div>


          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="fName"
                placeholder='First Name'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.fName && <span class='spancolor' >{errors.fName}</span>}
            </div>

            <div>
              <input
                type="text"
                name="lName"
                placeholder='Last Name'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.lName && <span class='spancolor' >{errors.lName}</span>}
            </div>

            <div>
              <input
                type="email"
                name="Email"
                placeholder='Email'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.Email && <span class='spancolor'>{errors.Email}</span>}
            </div>
            <div>
              <input
                type="text"
                name="Phone"
                placeholder='Phone'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.Phone && <span class='spancolor'>{errors.Phone}</span>}
            </div>
            

            <div>
              <input
                type="text"
                name="Specialty"
                placeholder='Specialty'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.Specialty && <span class='spancolor'>{errors.Specialty}</span>}
            </div>

            <div>
              <input
                type="text"
                name="Address"
                placeholder='Working Address'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.Address && <span class='spancolor'>{errors.Address}</span>}
            </div>

            <div>
              <input
                type="text"
                name="License"
                placeholder='Certificate Number'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.License && <span class='spancolor'>{errors.License}</span>}
            </div>

            <div>
              <textarea
                name="contactMessage"
                className='form-control formInput'
                placeholder='Note (Optional)'
                autoComplete='off'
                rows="6"
                onChange={handleChange}
              />
              {errors.contactMessage && <span class='spancolor'>{errors.contactMessage}</span>}
            </div>
            <button className='submit-btn' type='submit'>
              Submit
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
