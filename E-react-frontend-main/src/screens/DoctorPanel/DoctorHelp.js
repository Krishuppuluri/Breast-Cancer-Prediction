import React, { useState } from 'react';
import axios from "axios";
import '../../styles/screens/DoctorHelp.css';


const DoctorHelp = () => {


  const [formData, setFormData] = useState({
    helpName: '',
    helpEmail: '',
    helpPhone: '',
    helpMessage: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      axios.post("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/doctorhelp", {
        formData
      })
      alert("Submitted successfully")
      window.location.href = '/doctor';
    }
    catch (e) {
      console.log(e);
    }
    const validationErrors = {}
    if (!formData.helpName.trim()) {
      validationErrors.helpName = "Name is required"
    }

    if (!formData.helpEmail.trim()) {
      validationErrors.helpEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.helpEmail)) {
      validationErrors.helpEmail = "Email is not valid"
    }

    if (!formData.helpPhone.trim()) {
      validationErrors.helpPhone = "Phone is required"
    } else if (formData.helpPhone.length < 10) {
      validationErrors.helpPhone = "Phone should be at least 10 digits"
    }

    if (!formData.helpMessage.trim()) {
      validationErrors.helpMessage = "Message is required"
    } else if (formData.helpMessage.length > 10) {
      validationErrors.helpMessage = "Max length is 20 characters"
    }

    setErrors(validationErrors)



  }

  return (
    <div className='help-container'>
      <div className='row'>
        <div className='col-12 text-center'>

          <form onSubmit={handleSubmit}>
           
            <div>
              <input
                type="text"
                name="helpName"
                placeholder='Full Name'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactName && <span class='spancolor' >{errors.contactName}</span>}
            </div>
            <div>
              <input
                type="email"
                name="helpEmail"
                placeholder='Email address'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactEmail && <span class='spancolor'>{errors.contactEmail}</span>}
            </div>
            <div>
              <input
                type="text"
                name="helpPhone"
                placeholder='Phone number'
                autoComplete='off'
                onChange={handleChange}
              />
              {errors.contactPhone && <span class='spancolor'>{errors.contactPhone}</span>}
            </div>
            <div>
              <textarea
                name="helpMessage"
                className='form-control formInput'
                placeholder='Max Allowed Characters: 6000'
                autoComplete='off'
                rows="8"
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
  );
};

export default DoctorHelp;
