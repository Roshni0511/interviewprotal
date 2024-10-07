import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, IconButton, Box, TextField, Stack, Button, Switch, List, Divider
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from '@mui/material/Slider';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';  
import {FormControl,InputLabel,  MenuItem,  Select, } from '@mui/material';
import Design from './Design';
import Badge from '@mui/material/Badge';
const SimpleDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const [vars, setVars] = useState({
    '--color': '#1976d2',
    '--box-shadow': 'rgb(25, 118, 210, .16)',
  });
 const[subcatagory, setsubcatagory] = useState([])
 const[rows,setRows] = useState([])
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setVars(event.target.checked ? {
      '--color': '#4caf50',
      '--box-shadow': 'rgb(76, 175, 80, .16)',
    } : {
      '--color': '#1976d2',
      '--box-shadow': 'rgb(25, 118, 210, .16)',
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const CustomSlider = styled(Slider)({
    width: 300,
    color: 'var(--color)',
    '& .MuiSlider-thumb': {
      [`&:hover, &.Mui-focusVisible`]: {
        boxShadow: '0px 0px 0px 8px var(--box-shadow)',
      },
      [`&.Mui-active`]: {
        boxShadow: '0px 0px 0px 14px var(--box-shadow)',
      },
    },
  });

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
const[initialValues, setinitialvalues] = useState({
  questions:'',
  answer:'',
})
const [editMode, setEditMode] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
 const[ categories, setCategories] = useState([])
const dataToken = localStorage.getItem('token');

  const handleSubmit = (values) => {
    const dataToken = localStorage.getItem('token');
    if(editMode)
    {
       axios.patch('https://interviewhub-3ro7.onrender.com/questions/' + editId, values,{
        headers: { Authorization: dataToken },
       })
       .then((res) => {
           data()
           demo()
          setOpen(false);
          setEditMode(false);

       })
       .catch((error) => {
          console.log(error);
          
       })
    }
   else
   {
    axios.post('https://interviewhub-3ro7.onrender.com/questions/create', values, {
      headers: { Authorization: dataToken },
    })
    .then((res) => {
      console.log("success");
      // setinitialvalues(res.data.data)
      data()
      demo()
      handleClose();
      setOpen(false);
    }).
    catch((error) => {
      console.log(error);
    });

   }
  };
  
  useEffect(() => {
   data()

 }, [dataToken])

  const data = async () => {
   axios.get('https://interviewhub-3ro7.onrender.com/questions',{
    headers: { Authorization: dataToken },
   })
   .then((res) => {
    console.log(res.data.data);
       setRows(res.data.data)
    
   })
   .catch((error) => {
    console.log(error);
    
   })
  }

  const demo = async () => {
    axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/',{
      headers: { Authorization: dataToken },
    })
    .then((res) => {
      setsubcatagory(res.data.data)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  demo()

  const cap = async () => {
    axios.get('https://interviewhub-3ro7.onrender.com/catagory/create', {
      headers: { Authorization: dataToken },
    })
    .then((res) => {
      console.log('data ===>');
      setCategories(res.data.data)
      
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  cap()

  const handleDelete = (id) => {
  axios.delete(`https://interviewhub-3ro7.onrender.com/questions/` +id,{
    headers: { Authorization: dataToken },
  })
  .then((res) => {
   data()
  })
  .catch((error) => {
    console.log(error);
    
  })
  }

   const handleEdit = (id) => {
    setEditId(id);
  setEditMode(true);
  setOpen(true);
   }
  return (
    <Design>
      <Box sx={{ margin: '20px' }}>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '85%', maxWidth: '100%', margin: '20px 10px 20px 0px' }} />
            <Box>
              <Button variant="outlined" onClick={handleClickOpen} sx={{
                background: '#1976d2', color: "#fff", margin: "0px 0px 10px 10px", padding: '10px ', '&:hover': {
                  background: '#115293',
                  color: '#fff',
                }
              }}>
                ADD Q & A
              </Button>
            </Box>
          </Box>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Question</StyledTableCell>
                <StyledTableCell>Answer</StyledTableCell>
                <StyledTableCell>Subcategory</StyledTableCell>
                <StyledTableCell align="center">Catagory Name</StyledTableCell>
                
                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{row.questions}</StyledTableCell>
                  <StyledTableCell>{row.answer}</StyledTableCell>
                  <StyledTableCell>
                  <Badge color="secondary" badgeContent=" " variant="dot">
                  {row.subcatagoryID ? row.subcatagoryID.subCatagoryname :'no'}
                 </Badge> 
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <Badge color="primary" badgeContent=" " variant="dot">
                   {row.subcatagoryID ? row.subcatagoryID.catagoryID.catagoryName:'no category'}
                 </Badge> 
                  
                    </StyledTableCell>
                  
                  <StyledTableCell align="center"onClick={() => handleDelete(row._id)}>
                    <IconButton aria-label="delete" >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center" onClick={() => handleEdit(row._id, row)}>
                    <IconButton  aria-label="update"  >
                    <EditIcon />
                    </IconButton>
                 
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add Q & A</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
           {({ values, setFieldValue }) => (
 <Form>
 <Divider />
 <List sx={{ pt: 0 }}>
   <Box
     component="form"
     sx={{
       '& > :not(style)': { m: 1, width: '55ch' },
     }}
     noValidate
     autoComplete="off"
   >
     <div style={{ padding: '15px' }}>
       <Field
         as={TextField}
         id="outlined-basic"
         name='questions'
         label="Questions"
         variant="outlined"
         sx={{ marginBottom: '20px', display: 'flex' }}
       />
       <Field
         as={TextField}
         id="outlined-basic"
         name='answer'
         label="Answer"
         variant="outlined"
         sx={{ display: 'flex' }}
       />
       <Box sx={{marginTop:'10px'}}>
                                         <FormControl fullWidth sx={{ minWidth: 120 }}>
                           <InputLabel>subcategory Name</InputLabel>
                           <Select
                   
                               label="subcategory Name"
                               name="subcatagoryID"
                               value={values.subcatagoryID}
                               onChange={(e) => setFieldValue('subcatagoryID', e.target.value)}
                           >
                               {subcatagory.filter((option) =>  option.status === 'on').map((option) => (
                                   <MenuItem key={option._id} value={option._id}>
                                       {option.subCatagoryname}
                                   </MenuItem>
                               ))}
                           </Select>
                       </FormControl>
                       </Box>
     </div>
   </Box>
   <Divider />
   <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
     <Button variant="contained" type='submit'>Submit</Button>
   </Stack>
 </List>
</Form>
           )}
         
        </Formik>
      </Dialog>
    </Design>
  );
}

SimpleDialogDemo.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};

export default SimpleDialogDemo;


