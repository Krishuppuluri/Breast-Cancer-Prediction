import React from 'react';
import  {Component} from 'react';
import './Registration.css'

const initialState ={
  labName : '',
  emailID : '',
  cEmailID: '',
  password:'',
  cPassword:'',
  address1 : '',
  address2 : '',
  postalCode: '',
  city : '',
  province : '',
  country:'',
  referringPhysicianName: '',
  referringPhysicianCI: '',
  insuranceInformation: '',
  paymentMethod: '',
  taxRegistrationNumber:''
}

class LabAdminRegistration extends Component {
    constructor(props){
      super(props);
      this.state = initialState
    }
    onLabNameChange = (event) =>{
      this.setState({labName: event.target.value})
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
    onProvinceChange = (event) =>{
      this.setState({province: event.target.value})
    }
    onCountryChange = (event) =>{
        this.setState({country: event.target.value})
    }
    onReferringPhysicianNameChange = (event) =>{
      this.setState({referringPhysicianName: event.target.value})
    }
    onReferringPhysicianCIChange = (event) =>{
      this.setState({referringPhysicianCI: event.target.value})
    }
    onInsuranceInformationChange = (event) =>{
        this.setState({insuranceInformation: event.target.value})
    }
    onPaymentMethodChange = (event) =>{
        this.setState({paymentMethod: event.target.value})
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
      // if(this.state.labName === '' || this.state.taxRegistrationNumber === '' || this.state.country ==='' || this.state.emailID === '' || 
      // this.state.cEmailID ==='' || this.state.password === '' || this.state.cPassword ==='' ||
      // this.state.address1 === '' || this.state.address2 ==='' || this.state.postalCode === '' || 
      // this.state.city ==='' || this.state.province === '' || this.state.referringPhysicianName ==='' || 
      // this.state.referringPhysicianCI === '' || this.state.insuranceInformation === '' || this.state.paymentMethod === '')
      // {
      //   return alert("Please enter all the details");
      // }
      // http://localhost:8080/api/users/LabAdminRegistration
      // https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/LabAdminRegistration
      fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/LabAdminRegistration',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          labName: this.state.labName,
          emailID : this.state.emailID,
          cEmailID: this.state.cEmailID,
          password: this.state.password,
          cPassword: this.state.cPassword,
          address1 : this.state.address1,
          address2 : this.state.address2,
          postalCode: this.state.postalCode,
          city : this.state.city,
          province : this.state.province,
          country : this.state.country,
          referringPhysicianName : this.state.referringPhysicianName,
          referringPhysicianCI : this.state.referringPhysicianCI,
          insuranceInformation : this.state.insuranceInformation,
          paymentMethod: this.state.paymentMethod,
          taxRegistrationNumber: this.state.taxRegistrationNumber
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
          <h1>Lab Admin Registration Form</h1>
          <div className='patform'>
            <div className="input-group-reg">
                <label>Lab Name</label>
                <input placeholder="Enter Your Lab Name" required onChange={this.onLabNameChange} />
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
                <input placeholder="Enter your Labs Address" required onChange={this.onAddressChange}/>
            </div>
            <div className="input-group-reg">
                <label>Location 2</label>
                <input placeholder="Enter your Labs Room No." required onChange={this.onAddress2Change}/>
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
                <label>Referring Physician Name</label>
                <input placeholder="Enter Your Referring Physician's Name" required onChange={this.onReferringPhysicianNameChange}/>
            </div>
            <div className="input-group-reg">
                <label>Referring Physician Contact Information</label>
                <input placeholder="Enter Your Referring Physician's Contact Information" required  onChange={this.referringPhysicianCI}/>
            </div>
            <div className="input-group-reg">
                <label>Insurance Information</label>
                <input placeholder="Insurance Information" required onChange={this.onInsuranceInformationChange}/>
            </div>
            <div className="input-group-reg">
                <label>Payment Method</label>
                <input placeholder="Payment Method" required onChange={this.onPaymentMethodChange}/>
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

export default LabAdminRegistration;
