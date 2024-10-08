import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Field, Form, Formik } from 'formik';

const Loginpage = () => {
    const history = useHistory();

    const [initialvalues, setInitialValues] = useState({
        email: '',
        password: '', 
    });

    const [showPassword, setShowPassword] = useState(false); 

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values) => {
        console.log(values.email);
        console.log(values.password);

        try {
            const data = await axios.post('https://interviewhub-3ro7.onrender.com/admin/login', values);
            console.log("==>==>" + data.data.token);
            setInitialValues(values);
            localStorage.setItem('token', data.data.token);
            history.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box sx={{ justifyContent: 'center', display: 'flex', margin: '130px 0px' }}>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '35ch' },
                        border: '2px solid #1976d2',
                        padding: '15px 30px 30px 30px',
                        boxShadow: '0 0 5px #1976d2',
                        borderRadius: '25px'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <h1 style={{ justifyContent: 'center', display: 'flex', color: '#1976d2', margin: '0px 0px 18px 0px' }}>Admin Panel</h1>

                        <Formik
                            enableReinitialize
                            initialValues={initialvalues}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Field
                                    as={TextField}
                                    id="outlined-email-input"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    autoComplete="current-email"
                                    sx={{ marginBottom: '20px', width: '314px' }}
                                />
                                
                                <Field
                                    as={TextField}
                                    id="outlined-password-input"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'} 
                                    name="password"
                                    autoComplete="current-password"
                                    sx={{ marginBottom: '20px', width: '314px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" type="submit">Submit</Button>
                                    </Stack>
                                </Box>
                            </Form>
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Loginpage;
