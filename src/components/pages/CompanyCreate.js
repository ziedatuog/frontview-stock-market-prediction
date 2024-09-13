 


import React from 'react';
import { Box, Typography, Button, TextField, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {AxiosInstance} from '../Axios';
import Footer from '../Footer';

const CompanyCreate = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: '',
            ticker: '',
        }
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const onSubmit = (data) => {
        AxiosInstance.post('companies/', data)
            .then(response => {
                console.log('Company created:', response.data);
                navigate('/companies'); // Navigate to CompanyList after creation
            })
            .catch(error => console.error('Error creating company:', error));
    };

    return (
        <div>
            <Box sx={{
                display: 'flex',
                width: '100%',
                backgroundColor: '#0003ff',
                marginBottom: '10px'
            }}>
                <Typography sx={{ marginLeft: '20px', color: '#ffffff' }}>
                    Create Company
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center', // Center the form horizontally
                padding: 6
            }}>
                <Box sx={{
                    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' }, // Responsive width
                    boxShadow: 5,
                    padding: 4,
                    backgroundColor: '#fff', // Optional: add background color for better visibility
                    borderRadius: 2
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Company Name"
                                        placeholder="Enter company name"
                                        {...field}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <Controller
                                name="ticker"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Ticker"
                                        placeholder="Enter company ticker"
                                        {...field}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
            <Footer/>
        </div>
    );
};

export default CompanyCreate;
