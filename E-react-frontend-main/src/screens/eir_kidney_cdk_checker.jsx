import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {Card, Container, Button, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CardContent } from '@mui/material';
import { storePredictionAPI } from '../utilities/apis';


import '../styles/screens/diagonostic.css';
/** 
 * Eir Kidney Team: Yanilda and Maryam
 * Eir is the norse goddes of Health 
**/

function Ckdml() {
  const location = useLocation();
  const [latestRecord, setLatestRecord] = useState();
  const [tableOfData, setTableOfData] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const patientId = location.state.id;

  const titlesOfData = [
    'age', 'blood_pressure', 'specific_gravity', 'albumin', 'sugar', 'red_blood_cells',
    'pus_cell', 'pus_cell_clumps', 'bacteria', 'blood_glucose_random', 'blood_urea', 'serum_creatinine', 'sodium',
    'potassium', 'haemoglobin', 'packed_cell_volume', 'white_blood_cell_count', 'red_blood_cell_count',
    'hypertension', 'diabetes_mellitus', 'coronary_artery_disease', 'appetite', 'peda_edema', 'aanemia'
  ];

  useEffect(() => {
    const getPatientLatestRecord = async () => {
      try {
        console.log('param found ', patientId);
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getPhysicaltestCK', {
          patientId
        });

        const { data } = response;

        if (data.error) {
          setDialogContent(JSON.stringify(data.error));
          setDialogOpen(true);
        } else {
          setLatestRecord(data);
          setTableOfData(data.data);
        }
      } catch (error) {
        setDialogContent(`Error With request on patient records: ${error.message}`);
        setDialogOpen(true);
      }
    };

    getPatientLatestRecord();
  }, [patientId]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const predict = async (recordTest) => {
    const record = recordTest.latestRecord;

    try {
      const response = await axios.post('https://kidneyml-844ab0d69ccd.herokuapp.com/api/check_ckd', record, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { data } = response;

      if (data.error) {
        setDialogContent(JSON.stringify(data.error));
        setDialogOpen(true);
      } else {
        const diagnosisMessage = `has CKD?: ${data.cdk_prediction || 'No diagnosis available'}`;
        setDiagnosis(diagnosisMessage);
        const phoneNumber = location.state.MobileNumber;
        const variable = data.cdk_prediction === 'true' ? 1 : 0;
        storePredictionAPI(phoneNumber, 'chronic_kidney',`CKD: ${data.cdk_prediction}`, 
        data.accuracy, 'physical_test_ck', record.record_id, variable);
      }
    } catch (error) {
      setDialogContent(`Error: ${error.message}`);
      setDialogOpen(true);
    }
  };



  return (
    <Container style={{ minHeight: '80vh' }}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h2" >
              Patient's Physical Test Result
              </Typography>
            <Card>
            <CardContent>
              <Button variant="contained" sx={{bgcolor: 'lightseagreen'}} onClick={() => predict({ latestRecord })}>
                Diagnose
              </Button>
              <Typography variant="h4" >
                Diagnosis:
              </Typography>
              <Typography variant="body1" >
               {diagnosis}
              </Typography>
            </CardContent>
          </Card>
          </Paper>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Variables</TableCell>
            <TableCell>Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableOfData.map((value, index) => (
            <TableRow key={index}>
              <TableCell>{titlesOfData[index]}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Ckdml;
