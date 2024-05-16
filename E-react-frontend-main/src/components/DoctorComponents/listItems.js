import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpIcon from '@mui/icons-material/Help';
export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to={"/doctor/dashboard"}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to={"/doctor/patients"}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Patients" />
    </ListItemButton>
    <ListItemButton component={Link} to={"/doctor/services"}>
      <ListItemIcon>
        <MedicalServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Planning" />
    </ListItemButton>
    <ListItemButton component={Link} to={"/doctor/profile"}>
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Profile"  />
    </ListItemButton>
    <ListItemButton component={Link} to={"/doctor/messages"}>
      <ListItemIcon>
       < MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Messages"   />
    </ListItemButton>
    <ListItemButton component={Link} to={"/calendar"}>
      <ListItemIcon>
       <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar"   />
    </ListItemButton>
    <ListItemButton component={Link} to={"/doctor/help"}>
      <ListItemIcon>
       <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help"   />
    </ListItemButton>
  </React.Fragment>
);

