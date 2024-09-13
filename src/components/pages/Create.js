 
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import MyDatePickerField from '../forms/MyDatePickerField'
import MyTextField from '../forms/MyTextFieldF'
import { useForm, Controller } from 'react-hook-form'
import {AxiosInstance} from '../Axios'
//import { Dayjs } from "dayjs"
import dayjs from 'dayjs'; // Import dayjs for date formatting
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const Create = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const defaultValues = {
        companyName:'',
        ticker:'',
        date:'',
        open:'', 
        high:'',
        low:'',
         close:'',
        volume:'',

    }
     

    useEffect(() => {
         
        AxiosInstance.get('companies/')
            .then(response => setCompanies(response.data))
            .catch(error => console.error(error));
    }, []);

   
    const { handleSubmit, control } = useForm({defaultValues:defaultValues});
    
    const onSubmit = (data) => {
         
        const formattedDate = data.date ? dayjs(data.date).format("YYYY-MM-DD") : null;
    
        console.log(data);
    
        AxiosInstance.post('stockdata/', {
            // company: {
            //     name: data.companyName,
            //     ticker: data.ticker
            // },
            company: data.company, // Pass the company ID directly
            date: formattedDate,
            open: data.open, 
            high: data.high,
            low: data.low,
            close: data.close,
            volume: data.volume,
        })
        .then(response => {
            // Navigate to the home page after successful submission
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
                    Create records
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex', 
                width: '100%',
                boxShadow: 5, 
                padding: 6,
                flexDirection: 'column'
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box >

                    </Box>
                    <Box sx={{ marginBottom: 2,
                        display: 'flex', 
                        justifyContent: 'center'
                     }}>
                        <FormControl sx={{ 
                            width: { xs: '80%', sm: '60%', md: '50%', lg: '40%' } 
                        }}>
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
                    {/* <Box sx={{ marginBottom: 2 }}>
                        <MyTextField
                            label="Ticker"
                            placeholder="Provide the company ticker"
                            name="ticker"
                            control={control}  // Just pass control and other props
                        />
                    </Box> */}
                    <Box sx={{ marginBottom: 2 }}>
                        <MyDatePickerField
                            label="Date"
                            name="date"
                            control={control}  // Just pass control and other props
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <MyTextField
                            label="Open"
                            placeholder="Open price"
                            name="open"
                            control={control}  // Just pass control and other props
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <MyTextField
                            label="High"
                            placeholder="High price"
                            name="high"
                            control={control}  // Just pass control and other props
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <MyTextField
                            label="Low"
                            placeholder="Low price"
                            name="low"
                            control={control}  // Just pass control and other props
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <MyTextField
                            label="Close"
                            placeholder="Close price"
                            name="close"
                            control={control}  // Just pass control and other props
                            type="number"
                            inputProps={{ step: "0.01" }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <MyTextField
                            label="Volume"
                            placeholder="Volume"
                            name="volume"
                            control={control}  // Just pass control and other props
                            type="number"
                            inputProps={{ step: "1" }}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
            <Footer/>
        </div>
    );
};

export default Create;
