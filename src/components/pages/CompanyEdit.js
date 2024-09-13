import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {AxiosInstance} from '../Axios';
import Footer from '../Footer';

const CompanyEdit = () => {
    const { id } = useParams(); // Get the company ID from the route parameters
    const navigate = useNavigate(); // Initialize useNavigate
    const { handleSubmit, control, reset } = useForm(); // Initialize useForm
    const [loading, setLoading] = useState(true);

    // Fetch company data asynchronously
    // const fetchCompanyData = async () => {
    //     try {
    //         const response = await AxiosInstance.get(`companies/${id}/`);
    //         console.log('Fetched company data:', response.data);
    //         reset(response.data); // Populate form with fetched data
    //     } catch (error) {
    //         console.error('Error fetching company data:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchCompanyData(); // Fetch company data when component mounts
    // }, [id]);

    const onSubmit = (data) => {
        AxiosInstance.put(`companies/${id}/`, data)
            .then(response => {
                console.log('Company updated:', response.data);
                navigate('/companies'); // Navigate to CompanyList after update
            })
            .catch(error => console.error('Error updating company:', error));
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
                    Edit Company
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
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
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
                                Update
                            </Button>
                        </form>
                    )}
                </Box>
            </Box>
            <Footer/>
        </div>
    );
};

export default CompanyEdit;
