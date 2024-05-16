
import * as React from 'react';
import { styled} from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mainListItems } from './listItems';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(7),
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(9),
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(!open ? closedMixin(theme) : openedMixin(theme)),
    },
  }),
);


export default function DoctorSideBar ({open, handleDrawerOpen, handleDrawerClose}){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   // Update the open state based on screen size
 
  return(
      <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={handleDrawerClose}  // Use handleDrawerClose here for closing the drawer
      PaperProps={{
            sx: {
                backgroundColor: "#0288d1",
                color: 'white'
            }
    }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [4],
        }}
      >
     {open ? (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
              ) : (
              <IconButton onClick={handleDrawerOpen}>
                  <ChevronRightIcon />
              </IconButton>
                )}
      </Toolbar>
      <Divider />
      <List >
        {mainListItems}
      </List>
    </Drawer>
  )
}