import React from 'react';
import { Box } from '@mui/material';

function MyMessage(props) {
    var text = props.text;
    var color = props.color;

    return React.createElement(Box, {
        sx: {
            backgroundColor: color,
            color: '#FFFFFF',
            width: '90%',
            height: '40px',
            position: 'absolute',
            top: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }, text);
}

export default MyMessage;
