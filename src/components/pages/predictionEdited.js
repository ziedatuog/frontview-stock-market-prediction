import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {AxiosInstance} from '../Axios';
import Footer from '../Footer';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

const Prediction = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch the list of companies when the component mounts
    useEffect(() => {
        setLoading(true); // Ensure loading state is set when fetching companies
        AxiosInstance.get('companies/')
            .then(response => {
                console.log('Fetched Companies:', response.data); // Log the data to the console
                setCompanies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
                setLoading(false);
            });
    }, []);

    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
    };

    const handlePredict = () => {
        if (!selectedCompany) return;
        setLoading(true);
        AxiosInstance.get(`companies/${selectedCompany}/predict_next_30_days/`)
            .then(response => {
                console.log('Prediction Data:', response.data); // Log prediction data
                setPredictionData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error predicting data:', error);
                setLoading(false);
            });
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
                    Stock Price Prediction
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                padding: 6,
                flexDirection: { xs: 'column', md: 'row' } // Ensure responsive design
            }}>
                <Box sx={{
                    width: { xs: '90%', sm: '80%', md: '50%' },
                    boxShadow: 5,
                    padding: 4,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    marginBottom: { xs: 4, md: 0 }
                }}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="company-select-label">Select Company</InputLabel>
                        <Select
                            labelId="company-select-label"
                            value={selectedCompany}
                            label="Select Company"
                            onChange={handleCompanyChange}
                        >
                            {companies.map(company => (
                                <MenuItem key={company.id} value={company.id}>
                                    {company.name} ({company.ticker})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handlePredict}
                        disabled={loading}
                    >
                        Predict
                    </Button>

                    {loading && <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}><CircularProgress /></Box>}

                    {predictionData && predictionData.plot ? (
                        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                            <Typography variant="h6">Prediction Results for {predictionData.ticker}</Typography>
                            <Box sx={{
                                marginTop: 2,
                                maxWidth: '100%',
                                maxHeight: '600px',
                                overflow: 'auto'
                            }}>
                                <img 
                                    src={`data:image/png;base64,${predictionData.plot}`} 
                                    alt="Prediction Plot" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        maxWidth: '100%', 
                                        objectFit: 'contain',
                                        border: '2px solid #000' // Border for better visualization
                                    }} 
                                />
                            </Box>
                        </Box>
                    ) : (
                        predictionData && !loading && <Typography color="error">Failed to load prediction plot.</Typography>
                    )}
                </Box>

                {/* Table of Predicted Data */}
                {predictionData && predictionData.predicted_data && (
                    <Box sx={{
                        width: { xs: '100%', md: '45%' },
                        boxShadow: 5,
                        padding: 4,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        marginLeft: { md: 4 }
                    }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Predicted Data
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Predicted Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(predictionData.predicted_data).map(([date, values]) => (
                                        <TableRow key={date}>
                                            <TableCell component="th" scope="row">
                                                {date}
                                            </TableCell>
                                            <TableCell align="right">{values.close.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Box>
            <Footer />
        </div>
    );
};

export default Prediction;
