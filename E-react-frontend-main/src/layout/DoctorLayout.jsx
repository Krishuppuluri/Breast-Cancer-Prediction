// DoctorLayout.js
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DoctorSideBar from "../components/DoctorComponents/DoctorSidebar";

function DoctorLayout(userInfo) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    const doctor_id = userInfo.doctorInfo.id;

    if (userInfo.doctorInfo.type !== "Doctor") {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DoctorSideBar 
                    open={sidebarOpen} 
                    handleDrawerOpen={ () => setSidebarOpen(true)} 
                    handleDrawerClose={()=>setSidebarOpen(false)} 
                />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',  
                        p: {
                          xs: 1, // Padding for extra small devices
                          sm: 2, // Padding for small devices
                          md: 2, // Padding for medium devices
                          lg: 2, // Padding for large devices
                        },
                        maxWidth: 'xl',
                        margin: '0 auto',
                        width: '100%',
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Outlet context={doctor_id} />
                </Box>
            </Box>
        </>
    );
}

export default DoctorLayout;
