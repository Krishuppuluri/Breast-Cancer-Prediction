import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Divider, Stack, TextField,  FormControl, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {InputAdornment} from '@mui/material';


export function DocProfile() {
  const doctorId = useOutletContext();
  const [ProfileData, setProfileData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        // http://localhost:8080
        // https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post(
          'https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorProfileInfo',
          {
            doctorId,
          }
        );
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log('error ');
        } else {
          console.log('data', data);
          setProfileData(data);
        }
      } catch (error) {
        console.log(`Error With request getting auth  recent : ${error.message}`);
      }
    };
    getData();
  }, [doctorId]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">My Profile</Typography>
          </Paper>
        </Grid>

        {/* Profile */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Info</Typography>
              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Stack spacing={1}>
                  <FormControl>
                    <TextField 
                           label="First Name"
                           size="small" 
                           placeholder="First Name" 
                           value={ProfileData.Fname || ''} 
                           fullWidth
                           variant="standard" 
                           />
                  </FormControl>
                  <FormControl>
                    <TextField 
                          label="Last Name"
                          size="small" 
                          placeholder="Last Name" 
                          value={ProfileData.Lname || ''}
                          sx={{ flexGrow: 1 }}
                          variant="standard" 
                           />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl>
                    <TextField
                     label="Role"
                     size="small" 
                     defaultValue="Doctor" 
                     variant="standard" 
                     />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <TextField
                      label="Email"
                      size="small"
                      type="email"
                      startAdornment={<EmailRoundedIcon />}
                      placeholder="Email"
                      value={ProfileData.EmailId || ''}
                      sx={{ flexGrow: 1 }}
                      variant="standard" 
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Stack>
                <Stack>
                  <FormControl>
                    <TextField 
                    label="City"
                    size="small" 
                    value={ProfileData.City || ''}
                    variant="standard"  />
                  </FormControl>
                  <FormControl>
                    <TextField 
                    label="Medical License Number"
                    size="small" 
                    value={ProfileData.Medical_LICENSE_Number || ''} 
                    variant="standard" 
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                    label="Active Patients" 
                    size="small" 
                    value={ProfileData.active_patients || ''}
                    variant="standard"  />
                  </FormControl>
                  <FormControl>
                    <TextField 
                    label="Specialization"
                    size="small" 
                    value={ProfileData.Specialization || ''} 
                    variant="standard"/>
                  </FormControl>
                </Stack>
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Button variant="contained" color='secondary'>Cancel</Button>
              <Button variant="contained" color='primary'>Save</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
