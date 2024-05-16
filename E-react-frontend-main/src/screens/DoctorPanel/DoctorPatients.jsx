import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useOutletContext } from "react-router-dom";
import DocRecordsAuth from '../../components/DoctorComponents/DocRecordsAuth';

export function DoctorPatients(){
    const doctorId = useOutletContext();
    return (
      <Container maxWidth="xl">
        <Grid container spacing={12}>

          {/* Patients Authorized */}
          <Grid item xs={12} md={12} sm={12}>
            <Paper
               sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
            >
              <h3>Patients</h3>
             
              <DocRecordsAuth doctorId={doctorId}/>
            </Paper>
          </Grid>
        </Grid>
       </Container>
     
       
    )
}