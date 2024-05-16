import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function ClinicalStaffDashboard() {
  return (
          <Container maxWidth="xl" >
            <Grid container spacing={12}>
              {/* Recent Patients */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 440,
                  }}
                >
                  <h3>Welcome to Clinical Staff Page!</h3>
                </Paper>
              </Grid>
              
            </Grid>
          </Container>
  );
}
