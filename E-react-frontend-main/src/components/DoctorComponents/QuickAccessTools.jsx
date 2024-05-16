// QuickAccessTools.js
import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const QuickAccessTools = ({ doctorId }) => {
  // Placeholder for quick access tools

  return (
    <Paper sx={{ p: 2 }}>
      <Button variant="contained" color="primary" fullWidth  sx={{ mt: 2 }}
            component={Link} to="/searchpatient">
        Diagnose
      </Button>
      <Button variant="contained" color="primary" fullWidth  sx={{ mt: 2 }}
         component={Link} to="/services"> 
        General Services
      </Button>
      {/* Add more tools here */}
    </Paper>
  );
};

export default QuickAccessTools;
