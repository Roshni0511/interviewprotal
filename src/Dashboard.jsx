import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Design from './Design';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
const Dashboard = () => {

    
  return (
    <>
     <Design>
      
     <Box sx={{ flexGrow: 1,margin:'10px' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid xs={2} sm={4} md={4} >
              <Item sx={{ color: 'black' }}>
                <h2> Total Category</h2>
                <h1 style={{ fontSize: '3rem', margin: '0px' }}>3</h1>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} >
              <Item sx={{ color: 'black' }}>
                <h2>Total Sub Category</h2>
                <h1 style={{ fontSize: '3rem', margin: '0px' }}>3</h1>
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <Item sx={{ color: 'black' }}>
                <h2 >Total Q / A</h2>
                <h1 style={{ fontSize: '3rem', margin: '0px' }}>1</h1>
              </Item>
            </Grid>
          </Grid>
        </Box>
     </Design>
    </>
  )
}

export default Dashboard
