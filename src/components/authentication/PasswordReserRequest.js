import '../../App.css';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import MyTextField from '../forms/MyTextField';
//import MyPassField from '../forms/MyPassField';
import MyButton from '../forms/MyButton';
//import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import {authAxios} from '../Axios';
import {AxiosInstance} from '../Axios'
import MyMessage from './Message';

function PasswordResetRequest() {
    //var navigate = useNavigate();
    var formMethods = useForm();
    var handleSubmit = formMethods.handleSubmit;
    var control = formMethods.control;

    var [ShowMessage, setShowMessage] = useState(false);

    function submission(data) {
        AxiosInstance.post('password_reset/', {
            email: data.email
        })
        .then(function(response) {
            setShowMessage(true);
        });
    }

    return (
        React.createElement("div", { className: "myBackground" },
            ShowMessage ? React.createElement(MyMessage, { text: "If your email exists, you have received an email with instructions for resetting the password", color: '#69C9AB' }) : null,
            React.createElement("form", { onSubmit: handleSubmit(submission) },
                React.createElement(Box, { className: "whiteBox" },
                    React.createElement(Box, { className: "itemBox" },
                        React.createElement(Box, { className: "title" }, "Request password reset")
                    ),
                    React.createElement(Box, { className: "itemBox" },
                        React.createElement(MyTextField, {
                            label: "Email",
                            name: "email",
                            control: control
                        })
                    ),
                    React.createElement(Box, { className: "itemBox" },
                        React.createElement(MyButton, {
                            label: "Request password reset",
                            type: "submit"
                        })
                    ),
                    React.createElement(Box, { className: "itemBox", sx: { flexDirection: 'column' } })
                )
            )
        )
    );
}

export default PasswordResetRequest;
