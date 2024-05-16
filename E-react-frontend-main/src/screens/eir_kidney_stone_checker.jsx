import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, Grid, Paper } from '@mui/material/';
import { Dialog, DialogTitle, DialogContent, DialogActions} from  '@mui/material/';
import { getPatientRecords, storePredictionAPI } from '../utilities/apis'; // Import the utility functions
/** 
 * Eir Kidney Team: Yanilda and Maryam
 * Eir is the norse goddes of Health 
**/

function KidneyStoneML() {
  const location = useLocation();
  const [recordList, setRecordList] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const phoneNumber = location.state.MobileNumber;
  const openDialog = (message) => {
  setDialogContent(message);
  setDialogOpen(true);
};
  useEffect(() => {
    const fetchPatientRecords = async () => {
      //Syed's API imageRetrieveByPhoneNumber
      const records = await getPatientRecords(phoneNumber,'CT-Scan_Abdomen');
      setRecordList(records);
    };

    fetchPatientRecords();
  }, [phoneNumber]);

  const predict = async (index) => {
    const record = recordList[index];

    try {
      const imageBlob = await fetch(`data:image/jpeg;base64,${record.file.buffer}`).then((response) =>
        response.blob()
      );
      const formData = new FormData();
      formData.append('img', imageBlob, record.file.originalname);

      const response = await axios.post('https://kidneyml-844ab0d69ccd.herokuapp.com/api/check_kidney_stone', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const { data } = response;

      if (data.error) {
        openDialog(JSON.stringify(data.error));
      } else {
        const diagnosisMessage = data.prediction || 'No diagnosis available';
        setDiagnosis(diagnosisMessage);
        const variable = data.prediction === 'Normal' ? 0 : 1;
        storePredictionAPI(phoneNumber, 'kidney_stone', data.prediction, data.accuracy, 'CT-Scan_Abdomen', record._id, variable);
      }
    } catch (error) {
      openDialog(`Error: ${error.message}`);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Grid container spacing={4} >
        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CT Scan Abdomen</TableCell>
                  <TableCell>Record Date</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Diagnosis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordList.map((record, index) => (
                  <TableRow key={record._id}>
                    <TableCell>
                      <img src={`data:image/jpeg;base64,${record.file.buffer}`} alt="kidney" width="150" height="150" />
                    </TableCell>
                    <TableCell>{record.RecordDate}</TableCell>
                    <TableCell>
                      <Button variant="contained" sx={{ backgroundColor: 'lightseagreen', color: 'white' }} onClick={() => predict(index)}>
                        Diagnose
                      </Button>
                    </TableCell>
                    <TableCell>
                    <div>
                       {diagnosis}
                    </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
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

export default KidneyStoneML;