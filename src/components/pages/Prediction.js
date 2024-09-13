import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, 
    Dialog, IconButton, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosInstance } from '../Axios';
import Footer from '../Footer';

const Prediction = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [predictionData, setPredictionData] = useState(null);
    const [futurePredictionsTable, setFuturePredictionsTable] = useState([]);
    const [graphImage, setGraphImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [viewTable, setViewTable] = useState(false);

    useEffect(() => {
        AxiosInstance.get('companies/')
            .then(response => {
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
                const { predicted_data, future_predictions_table, plot } = response.data;
                setPredictionData(predicted_data); // Store the prediction data
                setFuturePredictionsTable(future_predictions_table); // Table data
                setGraphImage(`data:image/png;base64,${plot}`); // Graph image in base64 format
                setLoading(false);
                setOpenDialog(true);
                setViewTable(false); // Start by showing the graph
            })
            .catch(error => {
                console.error('Error predicting data:', error);
                setLoading(false);
            });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const toggleView = () => {
        setViewTable(!viewTable); // Toggle between graph and table views
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
                padding: 6
            }}>
                <Box sx={{
                    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                    boxShadow: 5,
                    padding: 4,
                    backgroundColor: '#fff',
                    borderRadius: 2
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
                        sx={{
                            padding: '10px 20px',
                            backgroundColor: '#0003ff',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#0001cc'
                            }
                        }}
                    >
                        {loading ? 'Predicting...' : 'Predict Stock Price'}
                    </Button>
                </Box>
            </Box>

            {/* Dialog for displaying prediction result */}
            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                maxWidth="lg" 
                fullWidth
            >
                <Box sx={{ position: 'relative' }}>
                    <IconButton 
                        onClick={handleCloseDialog} 
                        sx={{ position: 'absolute', right: 16, top: 16 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
                        Prediction Result for {companies.find(c => c.id === selectedCompany)?.name}
                    </Typography>

                    <Box sx={{ padding: 3 }}>
                        <Button 
                            variant="outlined" 
                            onClick={toggleView} 
                            sx={{ marginBottom: 2 }}
                        >
                            {viewTable ? 'View Graph' : 'View Table'}
                        </Button>

                        {/* Display Graph or Table based on viewTable state */}
                        {viewTable ? (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Predicted Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {futurePredictionsTable.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.predicted_close}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box>
                                {/* Display graph */}
                                {graphImage ? (
                                    <img 
                                        src={graphImage} 
                                        alt="Stock Price Prediction Graph" 
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                ) : (
                                    <Typography>Graph will be displayed here</Typography>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Prediction;
