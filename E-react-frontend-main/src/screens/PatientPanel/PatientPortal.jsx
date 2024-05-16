import React from 'react';
import {
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import { readLoginData } from '../../loginData';
import FloatingChatWindow from '../../components/FloatingChatWindow';

const handleOpenNewTab = (path) => {
  const url = window.location.origin + path;
  window.open(url, '_blank');
};

export function PatientPortal() {
  const loginData = readLoginData();
  const [windowOpen, setwindowOpen] = React.useState(false);

  const toggleChatWindow = () => {
    setwindowOpen(!windowOpen);
  };

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Patient Portal Page
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant='body1' gutterBottom>
              Welcome to the patient portal. Here you can access your medical
              information and more.
            </Typography>

            <List>
              <ListItem>
                <Avatar>1</Avatar>
                <ListItemText primary='View Medical Records' />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>2</Avatar>
                <ListItemText primary='Schedule Appointments' />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>3</Avatar>
                <ListItemText primary='Prescription Refills' />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='div' gutterBottom>
                Upcoming Appointments
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary='Cardiology Appointment'
                    secondary='Monday, 15th Nov 2023, 10:00 AM'
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Dermatology Check-up'
                    secondary='Wednesday, 17th Nov 2023, 02:30 PM'
                  />
                </ListItem>
              </List>

              <Button variant='contained' color='primary' fullWidth>
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='div' gutterBottom>
                Live Actions
              </Typography>
              <div>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={toggleChatWindow}
                >
                  Live Text Chat
                </Button>
                {windowOpen && (
                  <FloatingChatWindow
                    patientId={loginData.id}
                    closeChat={toggleChatWindow}
                    identity='patient'
                  />
                )}
              </div>
              {/* should pass doctor ID and patient ID here */}
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  handleOpenNewTab(`/DoctorVideo?patientID=${loginData.id}`)
                }
              >
                Video Call
              </Button>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  handleOpenNewTab(`/Chatbot`)
                }
              >
                Medical Chatbot
              </Button>
              {/* Add more action buttons as needed */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant='h5' gutterBottom>
              Extra
            </Typography>

            <List>
              <ListItem>
                <Avatar>A</Avatar>
                <ListItemText primary='Lab Work Results' />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>B</Avatar>
                <ListItemText primary='Health Education Resources' />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>C</Avatar>
                <ListItemText primary='Referrals' />
              </ListItem>
              {/* Add more extra features as needed */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
