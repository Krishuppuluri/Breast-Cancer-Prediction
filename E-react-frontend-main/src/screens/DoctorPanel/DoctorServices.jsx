import React from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CardActionArea, 
  Select, 
  MenuItem, 
  InputLabel 
} from "@mui/material";
import HealingIcon from '@mui/icons-material/Healing';
import { Modal, Button, TextField} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
export function DoctorServices() {
    const doctorId = useOutletContext();
    const [openSurgeryModal, setOpenSurgeryModal] = useState(false);
    const [surgeryPlans, setSurgeryPlans] = useState([]);
    const [authorizedPatients, setAuthorizedPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(''); // Initialize to an empty string

    const fetchAuthorizedPatients = async () => {
        try {
          const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorPatientsAuthorized', { doctorId });
          setAuthorizedPatients(response.data);
          if (response.data.length > 0) {
            setSelectedPatient(response.data[0].id); // Set to the first patient's id
          }
        } catch (error) {
          console.error('Error fetching authorized patients:', error);
        }
      };
      
   
    const surgeryTypeRef = useRef(null);
    const surgeryDateRef = useRef(null);
    const consultationDetailsRef = useRef(null);
    const riskAssessmentDetailsRef = useRef(null);
    const postOperativeCarePlanRef = useRef(null);
    const columns = [
        { field: 'surgery_type', headerName: 'Surgery Type', flex: 2 },
        { 
          field: 'surgery_date', 
          headerName: 'Date',
          flex: 1,
          valueFormatter: params=>new Date(params?.value).toISOString().split('T')[0] 
        },
        // ... other columns
        {
          field: 'view',
          headerName: 'View Details',
          flex: 2,
          renderCell: (params) => (
            <Button onClick={() => viewSurgeryPlanDetails(params.row)}>View</Button>
          )
        }
      ];
      
      const resetFormRefs = () => {
        surgeryTypeRef.current.value = '';
        surgeryDateRef.current.value = '';
        consultationDetailsRef.current.value = '';
        riskAssessmentDetailsRef.current.value = '';
        postOperativeCarePlanRef.current.value = '';
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const surgeryType = surgeryTypeRef.current.value;
        const surgeryDate = surgeryDateRef.current.value;
        const preSurgeryConsultationDetails = consultationDetailsRef.current.value;
        const riskAssessmentDetails = riskAssessmentDetailsRef.current.value;
        const postOperativeCarePlan = postOperativeCarePlanRef.current.value;
        resetFormRefs()
        console.log(selectedPatient)
        let patientId=selectedPatient;
        if (patientId) {
          try {
            const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/saveSurgeryPlan', {
              doctorId,
              patientId,
              surgeryType, 
              surgeryDate, 
              preSurgeryConsultationDetails,
              riskAssessmentDetails, 
              postOperativeCarePlan
            });
            console.log(response.data);
            // Handle post-submission logic
            fetchSurgeryPlans()
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        } else {
          // Handle error if patientId is not selected
        }
      };
      
      
    const [selectedPlan, setSelectedPlan] = useState(null);
    const viewSurgeryPlanDetails = async (plan) => {
      try {
        const patientResponse = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientOverview', { patientId: plan.patient_id });
        if (patientResponse.data && patientResponse.data.patient_data) {
          setSelectedPlan({
            ...plan,
            patientName: `${patientResponse.data.patient_data.FName} ${patientResponse.data.patient_data.LName}`,
            age: patientResponse.data.patient_data.Age,
            gender: patientResponse.data.patient_data.Gender,
            weight: patientResponse.data.patient_data.weight
          });
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        // Handle error
      }
    };
      
    const fetchSurgeryPlans = async () => {
        try {
          console.log("Fetching surgery plans for doctor ID:", doctorId);
         // https://e-react-node-backend-22ed6864d5f3.herokuapp.com
          const response = await axios.post(' https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getSurgeryPlan', { doctorId });
          setSurgeryPlans(response.data);
        } catch (error) {
          console.error('Error fetching surgery plans:', error);
        }
      };
      
        useEffect(() => {
        fetchSurgeryPlans();
        fetchAuthorizedPatients();
        }, []);

      const style1 = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        minHeight: '100%',
        boxShadow: 24,
        pt: 2,
        pb: 3,
        overflowY: 'auto',
      };
      const handlePatientChange = (event) => {
        setSelectedPatient(event.target.value);
      };
      const SurgeryPlanModal = () => (
        <Modal open={openSurgeryModal} onClose={() => setOpenSurgeryModal(false)}>
          <Box sx={style1}>
            <Card>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* Form for adding surgery plan */}
                <Typography variant="h4" sx={{mt:2, mx:2}}>
                     Create A surgery Plan
                </Typography>
                <form onSubmit={handleSubmit}>
                <InputLabel id="patient-select-label" sx={{mb:2, mt:2}}>Select Patient</InputLabel>
                <Select 
                    fullWidth
                    labelId="patient-select-label"
                    value={selectedPatient}
                    label="Select Patient"
                    onChange={handlePatientChange}
                    name="patientId"
                    sx={{mt:2, mb:2}}
                >
                    {authorizedPatients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                        {`${patient.FName} ${patient.LName}`}
                    </MenuItem>
                    ))}
                </Select>
                <TextField 
                    fullWidth
                    label="Surgery Type" 
                    name="surgeryType"
                    inputRef={surgeryTypeRef}
                    defaultValue={surgeryTypeRef.current ? surgeryTypeRef.current.value : ''}
                    sx={{mt:2, mb:2}}
                />
                {/* Additional input fields */}
                <TextField 
                    fullWidth
                    label="Surgery Date" 
                    name="surgeryDate" 
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    inputRef={surgeryDateRef}
                    defaultValue={surgeryTypeRef.current ? surgeryTypeRef.current.value : ''}
                    sx={{mt:2}}
                />
                  <TextField 
                    fullWidth
                    label="pre Surgery ConsultationDetails" 
                    name="preSurgeryConsultationDetails"
                    inputRef={consultationDetailsRef}
                    defaultValue={consultationDetailsRef.current ? consultationDetailsRef.current.value : ''}
                    sx={{mt:2}}
                    multiline
                    rows={4}
                />
                <TextField 
                    fullWidth
                    label="riskAssessmentDetails" 
                    name="riskAssessmentDetails"
                    inputRef={riskAssessmentDetailsRef}
                    defaultValue={riskAssessmentDetailsRef.current ? riskAssessmentDetailsRef.current.value : ''}
                    sx={{mt:2}}
                    multiline
                    rows={4}
                />
                   <TextField 
                    fullWidth
                    label="postOperativeCarePlan" 
                    name="postOperativeCarePlan"
                    inputRef={postOperativeCarePlanRef}
                    defaultValue={postOperativeCarePlanRef.current ? postOperativeCarePlanRef.current.value : ''}
                    sx={{mt:2}}
                    multiline
                    rows={4}
                />
                {/* TextFields for preSurgeryConsultationDetails, riskAssessmentDetails, postOperativeCarePlan */}
                <Button fullWidth type="submit" variant="contained" color="primary">
                    Save Surgery Plan
                </Button>
                </form>

              </Grid>
              <Grid item xs={12} md={6}>
                <DataGrid
                  rows={surgeryPlans}
                  columns={columns}
                  pageSize={5}
                  sx={{minHeight:800}}
                />
              </Grid>
            </Grid>
            </Card>
          </Box>
        </Modal>
      );
      
      
      
    const services = [
        { icon: HealingIcon, title: "Surgery Planning", description: "Expert surgical planning and post-operative care." },
        // Add more services as needed
    ];

    const handleCardClick = (title) => {
        // Placeholder for click handler logic
        if (title === "Surgery Planning") {
            setOpenSurgeryModal(true);
        }
        console.log(`Clicked on ${title}`);
    };

    const handleDetailsModalClose = () => {
      setSelectedPlan(null);
  };
  
    const SurgeryPlanDetailsModal = () => (
        <Modal open={selectedPlan !== null} onClose={handleDetailsModalClose}>
          <Box sx={style1}>
            <Card sx={{width:"50%", transform: 'translate(50%, 50%)', textAlign:'center' }}> 
              <CardContent>
              {/* Display details of selectedPlan here */}
                <Typography variant="h6"><strong>Surgery Type: </strong> {selectedPlan?.surgery_type}</Typography>
                <Typography variant="h6"><strong>Patient ID: </strong> {selectedPlan?.patient_id}</Typography>
                <Typography variant="h6">
                  <strong>Patient Name: </strong>{selectedPlan?.patientName}
                </Typography>
                <Typography variant="h6"><strong>Age: </strong>{selectedPlan?.age}</Typography>
                <Typography variant="h6"><strong>Gender: </strong>{selectedPlan?.gender}</Typography>
                <Typography variant="h6"><strong>Weight: </strong>{selectedPlan?.weight}</Typography>
                <Typography variant="h6"><strong>Consultation Details: </strong>{selectedPlan?.pre_surgery_consultation_details}</Typography>
                <Typography variant="h6"><strong>Risk Assestment Details: </strong>{selectedPlan?.risk_assessment_details}</Typography>
                <Typography variant="h6"><strong>Post Operative Care Plan: </strong>{selectedPlan?.post_operative_care_plan}</Typography>
                <Typography variant="h6"><strong>Surgery Date: </strong>   {selectedPlan?.surgery_date ? new Date(selectedPlan.surgery_date).toISOString().split('T')[0] : 'Date not set'}</Typography>
                <Typography variant="h6"><strong>Plan Created on: </strong>{new Date(selectedPlan?.record_time).toLocaleString()}</Typography>
                <Button onClick={handleDetailsModalClose}>Exit</Button>
              {/* ...other details */}
              </CardContent>
            </Card>
            
          </Box>
        </Modal>
      );
      

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Doctor Services
            </Typography>
            <Grid container spacing={3}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                          sx={{ 
                            '&:hover': {
                              boxShadow: 6, // Change the shadow when hovering
                            }
                          }}
                        >
                            <CardActionArea onClick={() => handleCardClick(service.title)}>
                                <CardContent>
                                    <service.icon fontSize="large" />
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <SurgeryPlanModal />
            <SurgeryPlanDetailsModal/>
        </Box>
    );
}
