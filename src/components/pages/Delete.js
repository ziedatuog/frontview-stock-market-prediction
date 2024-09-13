  
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import MyDatePickerField from '../forms/MyDatePickerField';
import MyTextField from '../forms/MyTextField';
import { useForm, Controller } from 'react-hook-form';
import {AxiosInstance} from '../Axios';
import dayjs from 'dayjs'; // Import dayjs for date formatting
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer';

const Delete = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    const { handleSubmit, setValue, control } = useForm({
        defaultValues: {
            company: '',
            date: null,
            open: '',
            high: '',
            low: '',
            close: '',
            volume: '',
        },
    });

    useEffect(() => {
        // Fetch the list of companies
        AxiosInstance.get('companies/')
            .then(response => setCompanies(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (id) {
            // Fetch the stock data when an ID is present
            AxiosInstance.get(`stockdata/${id}/`)
                .then(res => {
                    const data = res.data;
                    // Set the default values for the form fields
                    setValue('company', data.company.id); // Set company ID
                    setValue('date', dayjs(data.date)); // Set date
                    setValue('open', data.open);
                    setValue('high', data.high);
                    setValue('low', data.low);
                    setValue('close', data.close);
                    setValue('volume', data.volume);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [id, setValue]);

    const onSubmit = (data) => {
        const formattedDate = data.date ? dayjs(data.date).format("YYYY-MM-DD") : null;

        AxiosInstance.put(`stockdata/${id}/`, {
            company: data.company, // Pass the company ID directly
            date: formattedDate,
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume,
        })
        .then(response => {
            navigate('/home');
        })
        .catch(error => console.error(error));
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
                    Edit Records
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex', 
                width: '100%',
                boxShadow: 5, 
                padding: 6,
                flexDirection: 'column'
            }}>
                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
                            <FormControl sx={{ width: { xs: '80%', sm: '60%', md: '50%', lg: '40%' } }}>
                                <InputLabel id="company-label">Company</InputLabel>
                                <Controller
                                    name="company"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="company-label"
                                            {...field}
                                            label="Company"
                                        >
                                            {companies.map(company => (
                                                <MenuItem key={company.id} value={company.id}>
                                                    {company.name} ({company.ticker})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <MyDatePickerField
                                label="Date"
                                name="date"
                                control={control}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <MyTextField
                                label="Open"
                                placeholder="Open price"
                                name="open"
                                control={control}
                                type="number"
                                inputProps={{ step: "0.01" }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <MyTextField
                                label="High"
                                placeholder="High price"
                                name="high"
                                control={control}
                                type="number"
                                inputProps={{ step: "0.01" }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <MyTextField
                                label="Low"
                                placeholder="Low price"
                                name="low"
                                control={control}
                                type="number"
                                inputProps={{ step: "0.01" }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <MyTextField
                                label="Close"
                                placeholder="Close price"
                                name="close"
                                control={control}
                                type="number"
                                inputProps={{ step: "0.01" }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <MyTextField
                                label="Volume"
                                placeholder="Volume"
                                name="volume"
                                control={control}
                                type="number"
                                inputProps={{ step: "1" }}
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                )}
            </Box>
            <Footer />
        </div>
    );
};

export default Delete;
