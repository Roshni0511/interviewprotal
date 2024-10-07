import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { Box, Divider, FormControlLabel, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import Design from './Design';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';


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

function SimpleDialogDemo() {
  const[search, setsearch] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [catlist, setCatlist] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({ catagoryName: '' });
  const[editid, seteditId] = React.useState(null)
  const dataToken = localStorage.getItem('token');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {                 
    Data();
  },[dataToken]);
  
  useEffect(() => {
    getsearch()
  },[search])
  const Data = async () => {
    // axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
    //   headers:
    //     { Authorization: dataToken }
    // })
    //   .then(response => {
    //     setCatlist(response.data.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    try{
      const response = await axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
          headers:
            { Authorization: dataToken }
       })
       setCatlist(response.data.data)
    }
    catch(error) {
      console.log(error);
      
    }
  };


  const getsearch = async () => {
    try{
         const response = await axios.get(`https://interviewhub-3ro7.onrender.com/catagory/?search=${search}`,{
          headers: { Authorization: dataToken },
        })
        setCatlist(response.data.data)
    }
    catch(error)
  {
    console.log(error); 
  }
  }
  const handlesearchchange = (event) => {
    setsearch(event.target.value)
  }

  const handleSubmit = (values) => {
    if (editid != null) {
      axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${editid}`, values, {
        headers: { Authorization: dataToken }
      })
      .then((ress) => {
        Data();
        seteditId(null);  
        setInitialValues({ initialValues }); 
        handleClose(); 
      })
      .catch((error) => {
        console.log(error);
      });
    } 
    else 
    {
      axios.post('https://interviewhub-3ro7.onrender.com/catagory/create', values, {
        headers: { Authorization: dataToken }
      })
      .then(() => {
        handleClose();
        Data();
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
  

  const deletdata = (id) => {
    axios.delete('https://interviewhub-3ro7.onrender.com/catagory/' +id,{
      headers: { Authorization: dataToken }
    })
   .then((res) => {
    Data()
   })
   .catch((error) => {
    console.log(error);
     
   })
  }
 
  const updatedata = (item) => {
    setInitialValues({initialValues});
    seteditId(item._id);
    setOpen(true);  
  }

  const handleStatusChange = async (e, record) => {
    const newStatus = e.target.checked ? 'on' : 'off'; 
  
    try {
      await axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${record._id}`, {
        'status': newStatus
      }, { 
        headers: { Authorization: dataToken }
      });
 
      await subcategory(record._id, newStatus);  
  
      Data();  
    } 
    catch (error) {
      console.error(error);
    }
  };


  const subcategorystatus = (filtersub, status) => {
    for(let i = 0; i < filtersub.length; i++) {
      const id = filtersub[i]._id;
      axios.patch(`https://interviewhub-3ro7.onrender.com/subcatagory/${id}`, {
        'status': status  
      }, {
        headers: { Authorization: dataToken },
      })
      .then((res) => {
        console.log('Subcategory status updated successfully');
      })
      .catch((error) => {
        console.log('Error updating subcategory status', error);
      });
    }
  };


  const subcategory = async (id, categoryStatus) => {
    try {
      const response = await axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
        headers: { Authorization: dataToken },
      });
      
      const filtersub = response.data.data.filter(item => item.catagoryID._id === id);
      console.log("Filtered subcategories", filtersub);
  
      subcategorystatus(filtersub, categoryStatus);  
    } catch (error) {
      console.error("Error in subcategory", error);
    }
  };
  


  const categorystatus = (id,values) => {
    axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${id}`,values, {
     
        headers: { Authorization: dataToken },
      
    })
    .then((res) => {
      subcategory(id)
    })
    .catch((error) => {
      console.log(error);
      
    })
  }
  

 
  return (
  <Design>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add Category</DialogTitle>
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
        <Divider />
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          <Form>
            <List sx={{ pt: 0 }}>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div style={{ marginBottom: '20px', marginTop: '10px', padding: '15px' }}>
                  <Field
                    as={TextField}
                    id="outlined-multiline-flexible"
                    label="Category"
                    name="catagoryName"
                  />
                </div>
              </Box>
              <Divider />
<Stack
                spacing={2}
                direction={"row"}
                sx={{ margin: '10px', display: 'flex', justifyContent: 'end' }}
              >
                <Button
                  variant='contained'
                  type="submit"
                >
                  SUBMIT
                </Button>
              </Stack>
            </List>
          </Form>
        </Formik>
      </Dialog>

      <Box sx={{ display: 'flex', margin: '15px' }}>
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <TextField 
          fullWidth 
          label="Search Category" 
          id="fullWidth"
          value={search}
          onChange={handlesearchchange}
           />
        </Box>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            background: '#1976d2',
            color: 'white',
            margin: '0px 10px',
            padding: '10px',
            '&:hover': {
              background: '#115293',
              color: 'white',
            },
          }}
        >
          ADD CATEGORY
        </Button>
      </Box>

      <Box sx={{ margin: '20px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="left">Category Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {catlist.map((item, index) => (
                <StyledTableRow key={item.No}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.catagoryName}</StyledTableCell>
                  <StyledTableCell align="center">
                
                    <FormControlLabel control={<Switch checked={item.status === 'on'} onChange={(e) => handleStatusChange(e, item)} />}  />
                   
                    </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconButton aria-label="delete" onClick={() => deletdata(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center" onClick={() => updatedata(item)}>
                    <EditIcon />
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  </Design>
  );
}

export default SimpleDialogDemo;