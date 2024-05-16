import React from 'react';
import  {Component} from 'react';
import Select from 'react-select';
import './LabApp.css'

const options = [
    { value: 'basic_metabolic_pane', label: 'Basic Metabolic Pane - Ottawa, Ontario' },
    { value: 'blood_test', label: 'Blood Test - Ottawa, Ontario' },
    { value: 'complete_blood_count', label: 'Complete Blood Count - Ottawa, Ontario' },
    { value: 'comprehensive_metabo', label: 'Comprehensive Metabo - Ottawa, Ontario' },
    { value: 'lipid_profile', label: 'Lipid Profile - Ottawa, Ontario' },
    { value: 'thyroid_test', label: 'Thyroid Test - Ottawa, Ontario' },
    { value: 'urinalysis', label: 'Urinalysis - Ottawa, Ontario' },
    { value: 'vitamin_test', label: 'Vitamin test - Ottawa, Ontario' }
];

const options2 = [
    {value:'10am', label:'10 AM - 11 AM' },
    {value:'11am', label:'11 AM - 12 PM' },
    {value:'12pm', label:'12 PM - 1 PM'},
    {value:'1pm', label:'1 PM - 2 PM' },
    {value:'2pm', label:'2 PM - 3 PM' },
    {value:'3pm', label:'3 PM - 4 PM' },
    {value:'4pm', label:'4 PM - 5 PM' },
    {value:'5pm', label:'5 PM - 6 PM' },
    {value:'6pm', label:'6 PM - 7 PM' },
] 

const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #bdc3c7',
      borderColor: 'lightgray',
      boxShadow: 'none',
      width:'25em',
      padding: '5px 10px',
      borderRadius: '5px',
    //   backgroundColor: '#E8E9EB'
    }),
    option: (provided, state) => ({
      ...provided,
    //   backgroundColor: state.isFocused ? 'lightgray' : 'white', 
    //   color: state.isSelected ? '#fff' : '#333',
    //   backgroundColor: state.isSelected ? '#007aff' : '#fff',
      backgroundColor: state.isSelected ? 'F5FBFF' : state.isFocused ? '#AFDCEB' : null,
    color: state.isSelected ? 'Black' : state.isFocused ? 'white' : 'black',
      padding: '10px 15px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#007aff'
    })
  };
  

const initialState ={
  labTest:'',
  patientUUID : '',
  password: '',
  appointmentDate: '',
  appointmentTime: '',
}

class LabApp extends Component {
    constructor(){
      super();
      this.state = initialState
    }
    onLabTestChange = (selectedOption) =>{
        this.setState({labTest: selectedOption.value})
    }
    onPatientUUIDChange = (event) =>{
      this.setState({patientUUID: event.target.value})
    }
    onPasswordChange = (event) =>{
      this.setState({password: event.target.value})
    }
    onAppointmentDateChange = (event) =>{
      this.setState({appointmentDate: event.target.value})
    }
    onAppointmentTimeChange = (selectedOption) =>{
      this.setState({appointmentTime: selectedOption.value})
    }

    onSubmitRegister = () =>{
      fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/LabApp',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          labTest: this.state.labTest,
          patientUUID : this.state.patientUUID,
          password : this.state.password,
          appointmentDate : this.state.appointmentDate,
          appointmentTime : this.state.appointmentTime
        })
      }).then(response => {
        if(response.status === 400){throw new Error()}
        return response.json();
        }
      )
      .then(user => {
        if(user.id){
          alert("Successfully registered")
        }
      })
      .catch(error => {
        console.error('There was an error during booking an appontment:', error);
      });
    }

    render(){
      return (
        <div className='background'>
        <form className="patient-registration-form-lab shadow-3 b--dark-gray br4 b--black-10 ba bg-white-50">
          <h1>Book An Appointment</h1>
          <div className='patform-lab'>
            <div className="input-group-reg-lab">
                <label>Select a Lab Test</label>
                <Select options={options} styles={customStyles} defaultValue={options[0]} onChange={this.onLabTestChange} />
            </div>
            <div className="input-group-reg-lab">
                <label>Patient UUID</label>
                <input placeholder="Enter Your UUID" required onChange={this.onPatientUUIDChange}/>
            </div>
            <div className="input-group-reg-lab">
                <label> Patient Password</label>
                <input placeholder="Enter Your Password" required type="password" onChange={this.onPasswordChange}/>
            </div>
            <div className="input-group-reg-lab">
                <label>Appointment Date</label>
                <input placeholder="Enter your Labs Address" type="date" required onChange={this.onAppointmentDateChange}/>
            </div>
            <div className="input-group-reg-lab">
                <label>Select an Appointment Slot</label>
                <Select options={options2} styles={customStyles} defaultValue={options2[0]} onChange={this.onAppointmentTimeChange}/>
            </div>
            <button className ="patient-button-lab" type="button" onClick={this.onSubmitRegister}> Submit </button>
          </div>
        </form>
      </div>
      );
    }
}

export default LabApp;
