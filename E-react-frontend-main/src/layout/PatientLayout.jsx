import React from "react";
import {  Outlet, Navigate  } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PatientSideBar from "../components/PatientComponents/PatientSidebar";


function PatientLayout(data) {
    const patient_id =data.data.id;
    console.log("patient id here:",patient_id)
    if(data.data.type!=="Patient"){
        return <Navigate to="/"/>
    }
    return(
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PatientSideBar />
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
            >
                <Outlet context={patient_id}/>
            </Box>
        </Box>
        
        </>
    )
}

  
export default PatientLayout;
