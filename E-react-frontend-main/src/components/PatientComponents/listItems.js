import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpIcon from '@mui/icons-material/Help';
import PagesIcon from '@mui/icons-material/Pages';
export const mainListItems = (
  <React.Fragment>
     <ListItemButton component={Link} to={"/patient/portal"} >
      <ListItemIcon>
        <PagesIcon />
      </ListItemIcon>
      <ListItemText primary="Portal" />
    </ListItemButton>
    <ListItemButton component={Link} to={"/bookAppServices"}>
      <ListItemIcon>
        <MedicalServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Book Appointment"  />
    </ListItemButton>
    <ListItemButton component={Link} >
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Profile"  />
    </ListItemButton>
    <ListItemButton component={Link} >
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
    <ListItemButton component={Link} > {/* For admin Team */}
      <ListItemIcon>
       <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help"   />
    </ListItemButton>
  </React.Fragment>
);

