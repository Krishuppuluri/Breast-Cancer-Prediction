import React from "react";
import {  Outlet, Navigate  } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AdminSideBar from "../components/AdminComponents/AdminSidebar";


function AdminLayout(userInfo) {
    const admin_id =userInfo.adminInfo.id;

    if(userInfo.adminInfo.type!=="Admin"){
        return <Navigate to="/"/>
    }
    
    return(
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AdminSideBar />
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 1,
                height: '100vh',
                overflow: 'auto',
                maxWidth: 'lg', // Set a maximum width (you can use values like 'sm', 'md', 'lg', 'xl', or px values)
                margin: 'auto', // This centers the content
                width: '100%' // Use the full width available 
            }}
            >
                <Toolbar />
                <Outlet context={admin_id}/>
            </Box>
        </Box>
        
        </>
    )
}

  
export default AdminLayout;
