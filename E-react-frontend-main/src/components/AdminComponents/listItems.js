import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Link } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
export const mainListItems = (
  <React.Fragment>
    

    <ListItemButton component={Link} to={"/Admin"}>
      <ListItemIcon>
        <PersonAddAlt1Icon />
      </ListItemIcon>
      <ListItemText primary="New User Notification" />
    </ListItemButton>
    
    <ListItemButton component={Link} to={"/Admin/dochelp"}>
      <ListItemIcon>
        <MedicalServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Doctor Tech Help" />
    </ListItemButton>

    <ListItemButton component={Link} to={"/Admin/clinichelp"}>
      <ListItemIcon>
        <DeviceUnknownIcon />
      </ListItemIcon>
      <ListItemText primary="Clinic Tech Help" />
    </ListItemButton>

    <ListItemButton component={Link} to={"/HealthcareModels"}>
      <ListItemIcon>
       < AutoGraphIcon />
      </ListItemIcon>
      <ListItemText primary="Data Analysis"   />
    </ListItemButton>


    <ListItemButton component={Link} to={"/Admin/contact"}>
      <ListItemIcon>
       < HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us"   />
    </ListItemButton>

   
    <ListItemButton component={Link} to={"/Admin/review"}>
      <ListItemIcon>
       < MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews"   />
    </ListItemButton>

    <ListItemButton component={Link} to={"/Admin/joinus"}>
      <ListItemIcon>
       < PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Join Us"   />
    </ListItemButton>


  </React.Fragment>
);

