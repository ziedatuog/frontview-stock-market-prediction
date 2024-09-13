const React = require('react');
//const { useState } = require('react');
const { Box } = require('@mui/material');
//const MyTextField = require('../forms/MyTextField');
const MyPassField = require('../forms/MyPassField');
const MyButton = require('../forms/MyButton');
const { useParams, useNavigate } = require('react-router-dom');
const { useForm } = require('react-hook-form');
const {AxiosInstance} = require('../Axios');
const MyMessage = require('./Message');

function PasswordReset() {
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm();
    const params = useParams();
    const token = params.token;
    console.log(token);
    const [ShowMessage, setShowMessage] = React.useState(false);

    function submission(data) {
        AxiosInstance.post('password_reset/confirm/', {
            password: data.password,
            token: token,
        })
        .then(function (response) {
            setShowMessage(true);
            setTimeout(function () {
                navigate('/');
            }, 6000);
        });
    }

    return (
        React.createElement('div', { className: 'myBackground' },
            ShowMessage ? React.createElement(MyMessage, { text: 'Your password reset was successful, you will be directed to the login page in a second', color: '#69C9AB' }) : null,
            React.createElement('form', { onSubmit: handleSubmit(submission) },
                React.createElement(Box, { className: 'whiteBox' },
                    React.createElement(Box, { className: 'itemBox' },
                        React.createElement(Box, { className: 'title' }, 'Reset password')
                    ),
                    React.createElement(Box, { className: 'itemBox' },
                        React.createElement(MyPassField, {
                            label: 'Password',
                            name: 'password',
                            control: control
                        })
                    ),
                    React.createElement(Box, { className: 'itemBox' },
                        React.createElement(MyPassField, {
                            label: 'Confirm password',
                            name: 'password2',
                            control: control
                        })
                    ),
                    React.createElement(Box, { className: 'itemBox' },
                        React.createElement(MyButton, {
                            label: 'Reset password',
                            type: 'submit'
                        })
                    ),
                    React.createElement(Box, { className: 'itemBox', sx: { flexDirection: 'column' } })
                )
            )
        )
    );
}

module.exports = PasswordReset;
