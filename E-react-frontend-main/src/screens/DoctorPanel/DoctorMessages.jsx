import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
export function DoctorMessages() {
    const doctorId = useOutletContext();
    const [selectedPatient, setSelectedPatient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [patients, setPatients] = useState([]);



    // Inside DoctorMessages component
    useEffect(() => {
        fetchDoctorInfo();
        fetchPatients();
    }, []);

    const fetchDoctorInfo = async () => {
        try {
            const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorProfileInfo', { doctorId });
            // Assuming the response structure as { FName, LName, ... }
            setDoctorInfo(response.data); // Store doctor's info in state
        } catch (error) {
            console.error('Error fetching doctor info:', error);
        }
    };

    const [doctorInfo, setDoctorInfo] = useState(null); // Add this state


    const fetchPatients = async () => {
        try {
            const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorPatientsAuthorized', { doctorId });
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getDoctorPatientMessages', { doctorId, patientId: selectedPatient });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        if (selectedPatient) {
            fetchMessages();
        }
    }, [selectedPatient]);

    const handlePatientChange = (event) => {
        setSelectedPatient(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = async () => {
        if (message.trim() !== '' && selectedPatient && doctorInfo) {
            const selectedPatientData = patients.find(p => p.id === selectedPatient);
    
            if (selectedPatientData) {
                const patientFName = selectedPatientData.FName;
                const patientLName = selectedPatientData.LName;
    
                try {
                    //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
                    await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/sendDoctorPatientMessage', {
                        doctorId,
                        patientId: selectedPatient,
                        doctorFName: doctorInfo.Fname, 
                        doctorLName: doctorInfo.Lname,
                        patientFName, 
                        patientLName, 
                        message: "Dr. "+  doctorInfo.Lname+" : " +message,
                        time: new Date().toISOString()
                    });
                    setMessage('');
                    fetchMessages(); // Refresh the conversation
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            }
        }
    };
    
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Doctor Messages
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="patient-select-label">Select Patient</InputLabel>
                <Select
                    labelId="patient-select-label"
                    value={selectedPatient}
                    label="Select Patient"
                    onChange={handlePatientChange}
                >
                    {patients.map((patient) => (
                        <MenuItem key={patient.id} value={patient.id}>
                            {`${patient.FName} ${patient.LName}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Write a message"
                multiline
                rows={4}
                value={message}
                onChange={handleMessageChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={sendMessage}>
                Send Message
            </Button>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Previous Messages:</Typography>
                <Card variant="outlined" sx={{ mt: 1,  overflowY:"auto", maxHeight:200}}>
                    <CardContent>
                    {messages.map((msg, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2">
                                {new Date(msg.time_stamp).toLocaleString()}
                                {/* Converts the 'timestamp' field to a readable format */}
                            </Typography>
                            <Typography>
                                {msg.message}
                            </Typography>
                        </Box>
                    ))}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
