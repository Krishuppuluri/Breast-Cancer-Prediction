import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import JoinUs from './screens/JoinUs';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './screens/AdminPanel/AdminDashboard';
import ContactAdmin from './screens/AdminPanel/ContactAdmin';
import DocHelpAdmin from './screens/AdminPanel/DocHelpAdmin';
import JoinUsAdmin from './screens/AdminPanel/JoinUsAdmin';
import ClinicHelpAdmin from './screens/AdminPanel/ClinicHelpAdmin';
import ReviewAdmin from './screens/AdminPanel/ReviewAdmin';
import ClinicalStaffLayout from './layout/ClinicalStaffLayout';
import ClinicalStaffDashboard from './screens/ClinicalStaffPanel/ClinicalStaffDashboard';
import StaffHelp from './screens/ClinicalStaffPanel/StaffHelp';
import DoctorTaskStaff from "./screens/ClinicalStaffPanel/DocTaskStaff";
import PatientMessageStaff from "./screens/ClinicalStaffPanel/PatientMessageStaff";
import AboutUs from './screens/AboutUs';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import DoctorVideo from './screens/DoctorPanel/DoctorVideo'
import Skincancerml from './screens/skincancerml';
import Header from './components/Header-new';
import Footer from './components/footer-new';
import KidneyStoneML from './screens/eir_kidney_stone_checker';
import Ckdml from './screens/eir_kidney_cdk_checker';
import Heartdiseaseml from './screens/heartdiseaseml';
import LogIn from './screens/LogIn/LogIn';
import SignUp from './screens/SignUp/SignUp';
import PatientRegistration from './screens/SignUp/PatientRegistration';
import DoctorRegistration from './screens/SignUp/DoctorRegistration';
import HospitalAdminRegistration from './screens/SignUp/HospitalAdminRegistration'
import LabAdminRegistration from './screens/SignUp/LabAdminRegistration'
import LabApp from './screens/SignUp/LabApp'
import Specialities from './screens/Specialities';
import Services from './screens/Services';
import EmergencyLocations from './screens/EmergencyLocations';
import 'tachyons';
import SkinCancerMlPage from './screens/skinCancerMlPage';
import BreastCancerML from './screens/eir_breast_cancer_checker';
import BreastCancerPredictionML from './screens/breast_cancer_prediction';
import ThyroidDiseaseML from './screens/eir_thyroid_disease_checker';
import ThyroidML from './screens/eir_thyroid_disease_checker';
import Liver_disease_ML from './screens/liver_prediction_model';
import Pneumoniaml from './screens/Pneumoniaml';
import Bonecancerml from './screens/Bonecancerml';
import HepatitisML from './screens/hepatitis.jsx';
import DoctorLayout from './layout/DoctorLayout';
import Dashboard from './screens/DoctorPanel/DoctorDashboard';
import { DoctorPatients } from './screens/DoctorPanel/DoctorPatients';
import { DocProfile } from './screens/DoctorPanel/DoctorProfile';
import { DoctorMessages } from './screens/DoctorPanel/DoctorMessages';
import { DoctorServices } from './screens/DoctorPanel/DoctorServices';
import DoctorHelp from './screens/DoctorPanel/DoctorHelp';
import HeartStroke from './screens/HeartStroke';
import PsychologyPrediction from './screens/PsychologyPrediction';
import Tasks from './screens/Tasks';
import TasksList from './screens/TasksList';
import TestimonialsPage from './screens/TestimonialsPage'; // Import TestimonialsPage
import Terms from './screens/terms';
import Rights from './screens/rights';
import Webform from './screens/webform';
import HealthcareModels from './screens/ModelsHub'
import ThyroidModel from './screens/ThyroidModel'
import DoctorCalendar from './screens/Calendar/DoctorCalendar';
import PatientCalendar from './screens/Calendar/PatientCalendar';
import PatientBookTime from './screens/Calendar/PatientBookTime';
import TimeSegmentDetail from './screens/Calendar/TimeSegmentDetail';
import ServicesHomePage from './components/services/ServicesHomePage';
import HealthServices from './components/services/HealthServices';
import DoctorService from './components/services/DoctorService';
import PatientService from './components/services/PatientService';


import VoiceRecoginition from "./screens/VoiceRecoginition.js";
import VideoBackground from './styles/screens/VideoBackground';
import Chatbot from './screens/Chatbot/Chatbot';
import Sidebar from "./components/SideBar";
import PatientLayout from './layout/PatientLayout.jsx';
import {PatientPortal} from './screens/PatientPanel/PatientPortal.jsx'
import { readLoginData, clearLoginData, isTempLogin, writeLoginData } from './loginData.js';
import "./App.css";
import SkinDiseasesMlPage from './screens/SkinDiseasesMlPage.js';
import ViewRating from './screens/ViewRating';


import Analytic from './screens/analytics.js';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false,
      user: (() => readLoginData())(),
    };
  }

  loadUser = (data) => {
    const userInfo = {
      type: data.type,
      id: data.id,
      name: data.name,
      email: data.email,
      startInPage: data.startInPage
    };
    writeLoginData(userInfo, true);
    this.setState({
      user: userInfo,
    });
  }

  loadTempUser = (data) =>{
    const userInfo = {
      type: data.type,
      id: data.id,
      name: data.name,
      email: data.email,
      startInPage: data.startInPage
    };
    writeLoginData(userInfo, false);
    this.setState({
      user: userInfo,
    });
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  }
  clearUser = () => {
    const loginData = readLoginData();
    
    //https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/inactiveUser
    if(loginData.type === 'Patient'){
    fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/inactiveUser',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            email: loginData.email
          })
        })
    .then(res =>{
          if(res.status === 200){
            clearLoginData();
          }else{
            throw new Error('Error in processing request');
          }
        }).catch(error => {
          console.error('There was an error during the fetch:', error);
        });
        this.setState({
          user: {
            type: 'NotLoggedIn',
            id: -1,
            name: '',
            email: '',
            startInPage: '',
        }
      });
    }else{
      clearLoginData();
      this.setState({
        user: {
          type: 'NotLoggedIn',
          id: -1,
          name: '',
          email: '',
          startInPage: '',
        }
      });
    }
  }
  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
  handleBeforeUnload = (e) =>{
    const loginData = readLoginData();
    if(isTempLogin() && loginData.type === 'Patient'){
      try {
        fetch('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/inactiveUser',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            email: loginData.email
          })
        })
      } catch (err) {
        console.error('Error with signing out user', err);
      }
      e.preventDefault();
      e.returnValue = '';
      return 'Are you sure you want to leave? Your changes may not be saved.';
    }
  }
  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  render() {
    return (
      <BrowserRouter>
        <button className="menu-button" onClick={this.toggleSidebar}>
          &#9776;
        </button>
        {this.state.isSidebarOpen && (<Sidebar isOpen={this.state.isSidebarOpen} onClose={this.toggleSidebar} />
        )}
        <Header clearUser={this.clearUser} user={this.state.user} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ViewRating" element={<ViewRating />} />
          <Route path="/LogIn" element={this.state.user.type === 'NotLoggedIn' ? <LogIn loadUser={this.loadUser} loadTempUser = {this.loadTempUser} /> : <Navigate to={`${this.state.user.startInPage}`} />} />
          <Route path="/SignUp" element={this.state.user.type === 'NotLoggedIn' ? <SignUp loadUser={this.loadUser} /> : <Navigate to={`${this.state.user.startInPage}`} />} />
          <Route path="/searchpatient" element={<Searchpatient />} />
          <Route path="/skincancerml" element={<Skincancerml />} />
          <Route path="/skinCancerMLPage" element={<SkinCancerMlPage />} />
          <Route path="/skinCancerDiseasesPage" element={ <SkinDiseasesMlPage/>} />
          <Route path="/Searchresult" element={<Searchresult />} />
          <Route path="/DoctorVideo" element={< DoctorVideo />} />
          <Route path="/DBConnection" element={<DBConnection />} />
          <Route path="/testimonial" element={<TestimonialsPage />} /> {/* Use TestimonialsPage */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/JoinUs" element={<JoinUs />} />
          <Route path="/Admin" element={<AdminLayout adminInfo={this.state.user} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/Admin/dashboard" element={<AdminDashboard />} />
            <Route path="/Admin/dochelp" element={<DocHelpAdmin />} />
            <Route path="/Admin/clinichelp" element={<ClinicHelpAdmin />} />
            <Route path="/Admin/contact" element={<ContactAdmin />} />
            <Route path="/Admin/review" element={<ReviewAdmin />} />
            <Route path="/Admin/joinus" element={<JoinUsAdmin />} />
          </Route>
          <Route path="/ClinicalStaff" element={<ClinicalStaffLayout adminInfo={this.state.user} />}>
            <Route index element={<ClinicalStaffDashboard />} />
            <Route path="/ClinicalStaff/dashboard" element={<ClinicalStaffDashboard />} />
            <Route path="/ClinicalStaff/NewPatient" element={<PatientRegistration />} />
            <Route path="/ClinicalStaff/patientmessage" element={<PatientMessageStaff />} />
            <Route path="/ClinicalStaff/DoctorTask" element={<DoctorTaskStaff />} />
            <Route path="/ClinicalStaff/calendar" element={<DoctorCalendar />} />
            <Route path="/ClinicalStaff/techsupport" element={<StaffHelp />} />
          </Route>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/webform" element={<Webform />} />
          <Route path="/Tasks/:id" element={<Tasks />} />
          <Route path="/TasksList" element={<TasksList />} />
          <Route path="/kidneystoneml" element={<KidneyStoneML />} />
          <Route path="/chronickidneyml" element={<Ckdml />} />
          <Route path="/breastcancerml" element={<BreastCancerML />} />
          <Route path="/breastcancerpredictionml" element={<BreastCancerPredictionML />} />
          <Route path="/thyroidDiseaseml" element={<ThyroidML />} />
          <Route path="/Pneumoniaml" element={<Pneumoniaml />} />
          <Route path="/Bonecancerml" element={<Bonecancerml />} />
          <Route path="/hepatitis" element={<HepatitisML />} />
          <Route path="/heartdiseaseml" element={<Heartdiseaseml />} />
          <Route path="/heartstroke" element={<HeartStroke />} />
          <Route path="/PsychologyPrediction" element={<PsychologyPrediction />} />
          <Route path="/PatientRegistration" element={<PatientRegistration loadUser={this.loadUser} />} />
          <Route path="/DoctorRegistration" element={<DoctorRegistration loadUser={this.loadUser} />} />
          <Route path="/HospitalAdminRegistration" element={<HospitalAdminRegistration loadUser={this.loadUser} />} />
          <Route path="/LabAdminRegistration" element={<LabAdminRegistration loadUser={this.loadUser} />} />
          <Route path="/LabApp" element={<LabApp />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/serviceHome" element={<ServicesHomePage/>}/>
          <Route path="/services" element={<HealthServices/>}/>
          <Route path="/bookAppServices" element={<Services/>}/>
          <Route path="/doctorServices" element={<DoctorService/>} />
          <Route path="/patientServices" element={<PatientService/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/serviceshomepage" element={<ServicesHomePage />} />
          <Route path="/emergencyLocations" element={<EmergencyLocations />} />
          <Route path="/liverdiseaseML" element={<Liver_disease_ML />} />
          <Route path="/VoiceRecoginition" element={<VoiceRecoginition />} />
          <Route path="/Chatbot" element={<Chatbot userInfo={this.state.user}/>}/>
          <Route path="/doctor" element={<DoctorLayout doctorInfo={this.state.user} />}>
            <Route index element={<Dashboard />} />
            <Route path="/doctor/dashboard" element={<Dashboard />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/doctor/profile" element={<DocProfile />} />
            <Route path="/doctor/messages" element={<DoctorMessages />} />
            <Route path="/doctor/services" element={<DoctorServices />} />
            <Route path="/doctor/help" element={<DoctorHelp />} />
          </Route>
          <Route path="/patient" element={<PatientLayout data={this.state.user} />}>
            <Route index element={<PatientPortal />} />
            <Route path="/patient/portal" element={<PatientPortal />} />
          </Route>
          <Route path="/HealthcareModels" element={<HealthcareModels />} />
          <Route path="/ThyroidModel" element={<ThyroidModel />} />
          <Route path="/calendar" element={
            (this.state.user.type === 'Doctor') ?
              <DoctorCalendar /> :
              <PatientCalendar />
          }
          />
          <Route path="/calendar/timesegment/:id" element={<TimeSegmentDetail />} />
          <Route path="/calendar/booktime" element={<PatientBookTime />} />
          <Route path="/Analytic" element={<Analytic />}/>
          
        </Routes>
        <Footer status ={this.state.user.type} />
      </BrowserRouter>
    );
  }
}
export default App;
