import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { PatientRecordView } from './PatientRecordView';

export function PatientMedicalHistory({ patientId }) {
    const [openRecordModal, setOpenRecordModal] = useState(false);
    const [currentRecordData, setCurrentRecordData] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState({
        total_records: {},
        physical_test_cad: [],
        physical_test_ck: [],
        physical_test_hd: [],
        physical_test_ms: [],
        vaccines: [],
        bloodtests: [],
        ecg: [],
        eye_test: [],
        tumor: []
    });

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
                const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientMedicalHistory', { patientId });
                setMedicalHistory(response.data);
            } catch (error) {
                console.error('Error fetching medical history:', error);
            }
        };

        fetchMedicalHistory();
    }, [patientId]);


    const columnsForVaccines = [
      { field: 'id', headerName: 'ID', flex:0.5 },
      { field: 'disease_type', headerName: 'Disease Type', flex:1 },
      { field: 'Vaxx Status', headerName: 'Status', flex:1 },
  ];
   // Style for modal content
   const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Responsive width
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: '#f5f5f5', // Paper-like background color
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Softer shadow
    p: 4,
    borderRadius: 2, // Slight rounding of corners
  };
     // Style for the main container to mimic a page
     const pageStyle = {
        backgroundColor: '#fff', // White, like a page
        maxWidth: '8.5in', // Width of a standard US letter paper
        margin: 'auto', // Center it in the available space
        padding: '0.1in', // Padding to resemble a page's margins
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        overflowY: 'auto', // Allow vertical scrolling
    };
  
   // Function to handle viewing of specific test details
   const viewTestDetails = (testType) => {
      // Set the current data based on test type
      let data;
      switch (testType) {
          case 'CAD':
              data = medicalHistory.physical_test_cad;
              break;
          case 'CKD':
              data = medicalHistory.physical_test_ck;
              break;
          case 'HD':
               data = medicalHistory.physical_test_hd;
               break;
          case 'MS':
                  data = medicalHistory.physical_test_ms;
                  break;
          case 'BT':
                data = medicalHistory.bloodtests;
                break;
           case 'ECG':
                data = medicalHistory.ecg;
                break;
           case 'ET':
                data = medicalHistory.eye_test;
                break;
           case 'TM':
                data = medicalHistory.tumor;
                break;
           default:
            break;
        
      }
      setCurrentRecordData(data);
      setOpenRecordModal(true);
  };
     
    return (
        <Box sx={{ ...pageStyle, maxHeight: '100vh', overflowY: 'auto'}}>
        <Grid container spacing={2} >
         {/* Total Records */}
         <Grid item xs={12} md={12}>
            <Card><CardContent><Typography variant='h3' textAlign={'center'} >Medical Records</Typography></CardContent></Card>
         </Grid>
         <Grid item xs={12} md={5}>
                <Card sx={{mt:2,mb:2}}>
                   <Typography variant='h5' sx={{mx:2}} gutterBottom>Total Records</Typography>
                    <CardContent sx={{ maxHeight:1000, minHeight:'100%' , overflow: 'auto' }}>
                        <List>
                            {Object.entries(medicalHistory.total_records).map(([key, value]) => (
                                <ListItem key={key}>
                                    <ListItemText primary={`${key.replace(/_/g, ' ')}: ${value}`} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
                <Card>
                 {/* CT Scans */}{/* X-Rays */}
                    
                </Card>
            </Grid>

            {/* Physical Tests */}
            <Grid item xs={12} md={7}>
                <Card>
                    <CardContent>
                        <Typography variant='h5' gutterBottom>Physical Tests</Typography>
                        {medicalHistory.physical_test_cad.length > 0 && (
                            <Button onClick={() => viewTestDetails('CAD')}>Physical Tests For CAD</Button>
                        )}
                        {medicalHistory.physical_test_ck.length > 0 && (
                            <Button onClick={() => viewTestDetails('CKD')}>Physical Tests For CKD</Button>
                        )}
                        {medicalHistory.physical_test_hd.length > 0 && (
                            <Button onClick={() => viewTestDetails('HD')}>Physical Tests For Heart Disease</Button>
                        )}
                        {console.log('CAD tests length:', medicalHistory.physical_test_ms.length)} {/* Debug log */}
                        {medicalHistory.physical_test_ms.length > 0 && (
                            <Button onClick={() => viewTestDetails('MS')}>Physical Tests For Multiple Sclerosis</Button>
                        )}
                    </CardContent>
                </Card>
                 {/* Lab Results */}
                <Card>
                    <CardContent>
                        <Typography variant='h5' gutterBottom>Lab Results</Typography>
                        {medicalHistory.bloodtests.length > 0 && (
                            <Button onClick={() => viewTestDetails('BT')}>Blood Tests</Button>
                        )}
                        {medicalHistory.ecg.length > 0 && (
                            <Button onClick={() => viewTestDetails('ECG')}>ECG</Button>
                        )}
                        {medicalHistory.eye_test.length > 0 && (
                            <Button onClick={() => viewTestDetails('ET')}>Eye Test</Button>
                        )}
                        {medicalHistory.tumor.length > 0 && (
                            <Button onClick={() => viewTestDetails('TM')}>Tumor</Button>
                        )}
                    </CardContent>
                </Card>
                {/*Vaccines */}
                <Card>
                    <CardContent>
                        <Typography variant='h5'>Vaccines</Typography>
                        <Box style={{ height: 300, width: '100%' }}>
                            <DataGrid
                                rows={medicalHistory.vaccines}
                                columns={columnsForVaccines}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                getRowId={(row) => row.id}
                            />
                        </Box>
                    </CardContent>
                </Card>
   
            </Grid>
    
            <Modal open={openRecordModal} onClose={() => setOpenRecordModal(false)}>
               <Box sx={modalStyle}>
                  <Card sx={{minHeight:800, overflow:'auto'}}>
                  <PatientRecordView recordData={currentRecordData} />
                  </Card>
                    
               </Box>
            </Modal>
        </Grid>
        </Box>
    );
}
