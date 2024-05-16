import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useOutletContext } from "react-router-dom";
import DocRecentPatients from '../../components/DoctorComponents/DocRecentPatients';

import DoctorTasksList from '../../components/DoctorComponents/DoctorTasksList';
import QuickAccessTools from '../../components/DoctorComponents/QuickAccessTools';

export default function Dashboard() {
  const doctorId = useOutletContext();
  return (
    <Container maxWidth="xl" >
      <Grid container spacing={3}> {/* Adjusted spacing */}
        {/* Recent Patients */}
        <Grid item xs={12} md={12} lg={12}> {/* Adjusted grid size */}
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 440 }}>
            <h3>Top Ten Recent Patients</h3>
            <DocRecentPatients doctorId={doctorId}/>
          </Paper>
        </Grid>
         {/* Quick Access Tools */}
         <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <h3>Quick Access</h3>
            <QuickAccessTools doctorId={doctorId}/>
          </Paper>
        </Grid>
        {/* Tasks List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <h3>Reminders</h3>
            <DoctorTasksList doctorId={doctorId}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
