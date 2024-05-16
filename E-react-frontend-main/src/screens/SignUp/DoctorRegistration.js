import React from 'react';
import  {Component} from 'react';
import './Registration.css'

const initialState ={
  firstName : '',
  middleName : '',
  lastName : '',
  gender : '',
  age : 0,
  bloodGroup : '',
  mobileNumber : '',
  emailID : '',
  cEmailID: '',
  password:'',
  cPassword:'',
  address1 : '',
  address2 : '',
  postalCode: '',
  city : '',
  country:'',
  province : '',
  medicalLicenseNumber : '',
  specialization : '',
  pHospital : '',
  drivingLicenseNumber : '' 
}

class DoctorRegistration extends Component {
    constructor(props){
      super(props);
      this.state = initialState
    }
    onFirstNameChange = (event) =>{
      this.setState({firstName: event.target.value})
    }
    onMiddleNameChange = (event) =>{
      this.setState({middleName: event.target.value})
    }
    onLastNameChange = (event) =>{
      this.setState({lastName: event.target.value})
    }
    onGenderChange = (event) =>{
      this.setState({gender: event.target.value})
    }
    onAgeChange = (event) =>{
      this.setState({age: event.target.value})
    }
    onBloodGroupChange = (event) =>{
      this.setState({bloodGroup: event.target.value})
    }
    onMobileNumberChange = (event) =>{
      this.setState({mobileNumber: event.target.value})
    }
    onEmailIDChange = (event) =>{
      this.setState({emailID: event.target.value})
    }
    onConfirmEmailIDChange = (event) =>{
      this.setState({cEmailID: event.target.value})
    }
    onPasswordChange = (event) =>{
      this.setState({password: event.target.value})
    }
    onConfirmPasswordChange = (event) =>{
      this.setState({cPassword: event.target.value})
    }
    onAddressChange = (event) =>{
      this.setState({address1: event.target.value})
    }
    onAddress2Change = (event) =>{
      this.setState({address2: event.target.value})
    }
    onPostalCodeChange = (event) =>{
      this.setState({postalCode: event.target.value})
    }
    onCityChange = (event) =>{
      this.setState({city: event.target.value})
    }
    onCountryChange = (event) =>{
        this.setState({country: event.target.value})
    }
    onProvinceChange = (event) =>{
      this.setState({province: event.target.value})
    }
    onMedicalLicenseNumberChange = (event) =>{
      this.setState({medicalLicenseNumber: event.target.value})
    }
    onDrivingLicenseNumberChange = (event) =>{
      this.setState({drivingLicenseNumber: event.target.value})
    }
    onSpecializationChange = (event) =>{
      this.setState({specialization: event.target.value})
    }
    onPHospitalChange = (event) =>{
      this.setState({pHospital: event.target.value})
    }

    onSubmitRegister = () =>{
      if(this.state.password !== this.state.cPassword){
        return alert("Passwords do not match");
      }
      if(this.state.emailID !== this.state.cEmailID){
        return alert("Emails do not match");
      }
      if(this.state.gender.toLocaleLowerCase() !== 'male' && this.state.gender.toLocaleLowerCase() !== 'female'){
        return alert("Please enter a valid gender");
      }
      if(this.state.bloodGroup.toLocaleLowerCase() !== 'a+' && this.state.bloodGroup.toLocaleLowerCase() !== 'a-' && 
      this.state.bloodGroup.toLocaleLowerCase() !== 'b+' && this.state.bloodGroup.toLocaleLowerCase() !== 'b-' && 
      this.state.bloodGroup.toLocaleLowerCase() !== 'ab+' && this.state.bloodGroup.toLocaleLowerCase() !== 'ab-' && 
      this.state.bloodGroup.toLocaleLowerCase() !== 'o+' && this.state.bloodGroup.toLocaleLowerCase() !== 'o-' ){
        return alert("Please enter a valid bloodgroup");
      }
      if(this.state.firstName === '' || this.state.middleName ==='' || this.state.lastName === '' || 
      this.state.gender ==='' || this.state.age === 0 || this.state.bloodGroup ==='' || 
      this.state.mobileNumber === '' || this.state.country ==='' || this.state.emailID === '' || 
      this.state.cEmailID ==='' || this.state.password === '' || this.state.cPassword ==='' ||
      this.state.address1 === '' || this.state.address2 ==='' || this.state.postalCode === '' || 
      this.state.city ==='' || this.state.province === '' || this.state.medicalLicenseNumber ==='' || 
      this.state.specialization === '' || this.state.pHospital ==='' || this.state.drivingLicenseNumber === '')
      {
        return alert("Please enter all the details");
      }
      fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/DoctorRegistration',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          firstName: this.state.firstName,
          middleName : this.state.middleName,
          lastName : this.state.lastName,
          gender : this.state.gender,
          age : this.state.age,
          bloodGroup : this.state.bloodGroup,
          mobileNumber : this.state.mobileNumber,
          emailID : this.state.emailID,
          cEmailID: this.state.cEmailID,
          password: this.state.password,
          cPassword: this.state.cPassword,
          address1 : this.state.address1,
          address2 : this.state.address2,
          postalCode: this.state.postalCode,
          city : this.state.city,
          province : this.state.province,
          country: this.state.country,
          medicalLicenseNumber : this.state.medicalLicenseNumber,
          drivingLicenseNumber : this.state.drivingLicenseNumber,
          specialization : this.state.specialization,
          pHospital : this.state.pHospital 
        })
      }).then(response => {
        if(response.status === 400){throw new Error()}
        return response.json();
        }
      )
      .then(user => {
        alert("Successfully registered");
        this.state = initialState;
        window.location.href = '/LogIn';
      })
      .catch(error => {
        console.error('There was an error during the fetch:', error);
      });
    }

    render(){
      return (
        <div className='background-color'>
        <form className="patient-registration-form shadow-3 b--dark-gray br3 b--black-10 ba b--transparent">
          <h1>Doctors Registration Form</h1>
          <div className='patform'>
            <div className="input-group-reg">
                <label>First Name</label>
                <input placeholder="Enter Your First name" required onChange={this.onFirstNameChange} />
            </div>
            <div className="input-group-reg">
                <label>Middle Name</label>
                <input placeholder="Enter Your Middle Name" required onChange={this.onMiddleNameChange}/>
            </div>
            <div className="input-group-reg">
                <label>Last Name</label>
                <input placeholder="Enter Last Name" required onChange={this.onLastNameChange}/>
            </div>
            <div className="input-group-reg">
                <label>Gender</label>
                <input placeholder="Male Or Female" required onChange={this.onGenderChange}/>
            </div>
            <div className="input-group-reg">
                <label>Age</label>
                <input placeholder="Enter Your Age" required type="number" onChange={this.onAgeChange}/>
            </div>
            <div className="input-group-reg">
                <label>Blood Group</label>
                <input placeholder="Enter Blood Group" required onChange={this.onBloodGroupChange}/>
            </div>
            <div className="input-group-reg">
                <label>Mobile Number</label>
                <input placeholder="Enter Your Mobile Number" required onChange={this.onMobileNumberChange}/>
            </div>
            <div className="input-group-reg">
                <label>Email Id</label>
                <input placeholder="Enter Your Email ID" required onChange={this.onEmailIDChange}/>
            </div>
            <div className="input-group-reg">
                <label> Confirm Email Id</label>
                <input placeholder="Enter Your Email ID" required onChange={this.onConfirmEmailIDChange}/>
            </div>
            <div className="input-group-reg">
                <label>Password</label>
                <input placeholder="Enter Your Password" required type="password" onChange={this.onPasswordChange}/>
            </div>
            <div className="input-group-reg">
                <label>Confirm Password</label>
                <input placeholder="Enter Your Password" required type="password" onChange={this.onConfirmPasswordChange}/>
            </div>
            <div className="input-group-reg">
                <label>Location 1</label>
                <input placeholder="Enter your Practicing Address" required onChange={this.onAddressChange}/>
            </div>
            <div className="input-group-reg">
                <label>Location 2</label>
                <input placeholder="Enter your Practicing Room No." required onChange={this.onAddress2Change}/>
            </div>
            <div className="input-group-reg">
                <label>Postal Code</label>
                <input placeholder="Enter Your Postal Code" required onChange={this.onPostalCodeChange}/>
            </div>
            <div className="input-group-reg">
                <label>City</label>
                <input placeholder="Enter Your City" required onChange={this.onCityChange}/>
            </div>
            <div className="input-group-reg">
                <label>Province</label>
                <input placeholder="Enter Your Province" required onChange={this.onProvinceChange}/>
            </div>
            <div className="input-group-reg">
                <label>Country</label>
                <input placeholder="Enter Your Country" required onChange={this.onCountryChange}/>
            </div>
            <div className="input-group-reg">
                <label>Medical License Number</label>
                <input placeholder="Enter Your Medical License Number" required onChange={this.onMedicalLicenseNumberChange}/>
            </div>
            <div className="input-group-reg">
                <label>Driving License Number</label>
                <input placeholder="Enter License Number" required onChange={this.onDrivingLicenseNumberChange}/>
            </div>
            <div className="input-group-reg">
                <label>Specialization</label>
                <input placeholder="Enter Your Specialization" required onChange={this.onSpecializationChange}/>
            </div>
            <div className="input-group-reg">
                <label>Practicing Hospital</label>
                <input placeholder="Enter Your Practicing Hospital Name" required onChange={this.onPHospitalChange}/>
            </div>
            <button className ="patient-button" type="button" onClick={this.onSubmitRegister}> Submit </button>
          </div>
      </form>
      </div>
      );
    }
}

export default DoctorRegistration;
