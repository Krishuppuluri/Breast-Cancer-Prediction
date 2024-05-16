import React from 'react';
import  {Component} from 'react';
import './Registration.css'

const initialState ={
  hospitalName : '',
  emailID : '',
  cEmailID: '',
  password:'',
  cPassword:'',
  mobileNumber : '',
  address1 : '',
  address2 : '',
  postalCode: '',
  city : '',
  province : '',
  country:'',
  departments: 0,
  nDoctors: 0,
  nNurses: 0,
  nAdmins: 0,
  nPatients: 0,
  taxRegistrationNumber:''
}

class HospitalAdminRegistration extends Component {
    constructor(props){
      super(props);
      this.state = initialState
    }
    onHospitalNameChange = (event) =>{
      this.setState({hospitalName: event.target.value})
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
    onMobileNumberChange = (event) =>{
      this.setState({mobileNumber: event.target.value})
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
    onProvinceChange = (event) =>{
      this.setState({province: event.target.value})
    }
    onCountryChange = (event) =>{
        this.setState({country: event.target.value})
    }
    onDepartmentsChange = (event) =>{
      this.setState({departments: event.target.value})
    }
    onNumberOfDoctorsChange = (event) =>{
      this.setState({nDoctors: event.target.value})
    }
    onNumberOfNursesChange = (event) =>{
        this.setState({nNurses: event.target.value})
    }
    onNumberOfAdminsChange = (event) =>{
        this.setState({nAdmins: event.target.value})
    }
    onNumberOfPatientsChange = (event) =>{
      this.setState({nPatients: event.target.value},()=>{
        console.log(this.state.nPatients)
      })
    }
    onTaxRegistrationNumberChange = (event) =>{
      this.setState({taxRegistrationNumber: event.target.value})
    }

    onSubmitRegister = () =>{
      if(this.state.password !== this.state.cPassword){
        return alert("Passwords do not match");
      }
      if(this.state.emailID !== this.state.cEmailID){
        return alert("Emails do not match");
      }
      if(this.state.hospitalName === '' || this.state.nPatients === 0 ||
      this.state.mobileNumber === '' || this.state.country ==='' || this.state.emailID === '' || 
      this.state.cEmailID ==='' || this.state.password === '' || this.state.cPassword ==='' ||
      this.state.address1 === '' || this.state.address2 ==='' || this.state.postalCode === '' || 
      this.state.city ==='' || this.state.province === '' || this.state.taxRegistrationNumber ==='' || 
      this.state.departments === 0 || this.state.nDoctors === 0 || this.state.nNurses === 0 )
      {
        return alert("Please enter all the details");
      }
      // http://localhost:8080/api/users/
      // https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/HospitalAdminRegistration
      fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/HospitalAdminRegistration',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          hospitalName: this.state.hospitalName,
          emailID : this.state.emailID,
          cEmailID : this.state.cEmailID,
          password: this.state.password,
          cPassword: this.state.cPassword,
          mobileNumber : this.state.mobileNumber,
          address1 : this.state.address1,
          address2 : this.state.address2,
          postalCode: this.state.postalCode,
          city : this.state.city,
          province : this.state.province,
          country : this.state.country,
          departments : this.state.departments,
          nDoctors : this.state.nDoctors,
          nNurses : this.state.nNurses,
          nAdmins : this.state.nAdmins,
          nPatients : this.state.nPatients,
          taxRegistrationNumber : this.state.taxRegistrationNumber
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
          <h1>Hospital Admin Registration Form</h1>
          <div className='patform'>
            <div className="input-group-reg">
                <label>Hospital Name</label>
                <input placeholder="Enter Your Hospital Name" required onChange={this.onHospitalNameChange} />
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
                <label>Mobile Number</label>
                <input placeholder="Enter Your Mobile Number" required onChange={this.onMobileNumberChange}/>
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
                <label>Facilities- No. Of Departments</label>
                <input placeholder="Enter Total Facilities Departments" required type="number" min="0" onChange={this.onDepartmentsChange}/>
            </div>
            <div className="input-group-reg">
                <label>Number Of Doctors</label>
                <input placeholder="Enter Number of Doctors" required type="number" min="0" onChange={this.onNumberOfDoctorsChange}/>
            </div>
            <div className="input-group-reg">
                <label>Number Of Nurses</label>
                <input placeholder="Enter Number of Nurses" required type="number" min="0" onChange={this.onNumberOfNursesChange}/>
            </div>
            <div className="input-group-reg">
                <label>Number Of Admins</label>
                <input placeholder="Enter Number of Admins" required type="number" min="0" onChange={this.onNumberOfAdminsChange}/>
            </div>
            <div className="input-group-reg">
                <label> Number Of Patients Per Year </label>
                <input placeholder="Enter Number of Admins" required type="number" min="0" onChange={this.onNumberOfPatientsChange}/>
            </div>
            <div className="input-group-reg">
                <label>Tax registration number</label>
                <input placeholder="Tax registration number" required onChange={this.onTaxRegistrationNumberChange}/>
            </div>
            <button className ="patient-button" type="button" onClick={this.onSubmitRegister}> Submit </button>
          </div>
      </form>
      </div>
      );
    }
}

export default HospitalAdminRegistration;
