 
// import React from 'react';
// import Footer from '../Footer';
 

// const About = () => {
//     return (
//         <div>
//             About
//             <Footer/>
//         </div>
        
//     )
// };

// export default About;

import React from 'react';
import { Box, Typography, Paper, IconButton, Link } from '@mui/material';
import { Facebook, LinkedIn, Phone } from '@mui/icons-material';
import Footer from '../Footer';

const About = () => {
    return (
        <div>
            <Box sx={{
                display: 'flex',
                width: '100%',
                backgroundColor: '#0003ff',
                marginBottom: '10px',
                padding: '20px',
                justifyContent: 'center'
            }}>
                <Typography variant="h4" sx={{ color: '#ffffff' }}>
                    About Our App
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
            }}>
                <Paper sx={{ padding: '20px', maxWidth: '800px', textAlign: 'justify' }}>
                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                        Overview
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                        Welcome to our Stock Market Prediction App, designed to forecast Ethiopian stock prices using advanced machine learning models.
                    </Typography>

                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                        Features
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                        - Select Ethiopian companies to predict stock prices for the next 30 days.
                        <br />
                        - View predictions in graphical and tabular formats.
                    </Typography>

                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                        Technology Stack
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                        - React.js with Material-UI for the frontend.
                        <br />
                        - Django REST Framework for the backend.
                        <br />
                        - SQLite for data storage.
                        <br />
                        - Python with Scikit-Learn for predictive models.
                    </Typography>

                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1">
                        Reach out with questions or feedback. We value your input!
                    </Typography>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <Link href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <IconButton>
                        <Facebook sx={{ fontSize: 40 }} />
                    </IconButton>
                </Link>
                <Link href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                    <IconButton>
                        <LinkedIn sx={{ fontSize: 40 }} />
                    </IconButton>
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    <Phone sx={{ marginRight: 1 }} />
                    <Typography variant="body1">+251923456787</Typography>
                </Box>
            </Box>

            <Footer />
        </div>
    );
};

export default About;
