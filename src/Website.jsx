import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const pages = ['CATEGORY', 'SUB CATEGORY', 'Q & A'];


const Website = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <Box>
         <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' , fontSize:'17px' , padding:'0 20px'}}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Log in">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,color:'#fff'}}>
               
                  <MeetingRoomIcon />
              </IconButton>
            </Tooltip>
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
    <Box sx={{width:'100%' , display:'flex'}}>
    <Box sx={{width:'50%',marginTop:'30px'}}>
        <img src="https://img.freepik.com/free-vector/online-job-interview-illustration_23-2148642106.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726704000&semt=ais_hybrid" alt="" width={"100%"}  height={"60%"}/>
    </Box>
    <Box sx={{width:'50%'}}>
    <h1>khj</h1>
    </Box>
    </Box>
    </>
  )
}

export default Website
