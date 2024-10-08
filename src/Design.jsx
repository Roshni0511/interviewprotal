import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link } from '@mui/material';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const drawerWidth = 240;



function Design({children}) {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();
  

  const list = [
    { name: 'Dashboard', path: '/dashboard' }, 
    { name: 'Category', path: '/category' }, 
    { name: 'Sub-category', path: '/subcategory' }, 
    { name: 'Q & A', path: '/qa' }
  ]



  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ background: "#1976d2", color: '#FFF', fontSize: '1.25rem' }}>Interview Portal</Toolbar >

      <List>
        {list.map((text, index) => (
          <Link href={text.path} sx={{color:'rgba(0, 0, 0, 0.87)', textDecoration:'none'}}>
            <ListItem key={text} disablePadding>
            <ListItemButton
                sx={{
                  backgroundColor: location.pathname === text.path ? '#1976d2' : 'transparent',margin:'5px 17px',borderRadius:'5px',
                  
                  '&:hover': {
                    backgroundColor: location.pathname === text.path ? '#1976d2' : '#f0f0f0',
                  }
                }}
              >
                <ListItemIcon
                sx={{
                  color: location.pathname === text.path ? ' white' :'rgba(0,0,0,0.54)'
                }}
                >

                  {index === 0 && <SpaceDashboardIcon />}
                  {index === 1 && <CategoryIcon />}
                  {index === 2 && <ControlPointDuplicateIcon />}
                  {index === 3 && <HelpOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name}   sx={{
                  color: location.pathname === text.path ? ' white' :'rgba(0,0,0,0.54)'
                }}/>
              </ListItemButton>
            </ListItem></Link>
        ))}
      </List>

    </div>
  );


 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ display: "flex", alignItems: 'center', paddingRight: '20px' }}>

           <Link href="/" sx={{color:'#fff'}}> <MeetingRoomIcon sx={{ fontSize: '30px' }} /></Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

        <Drawer
         
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

          {children}

      </Box>
    </Box>
  );
}

Design.propTypes = {
 
  window: PropTypes.func,
};






export default Design
