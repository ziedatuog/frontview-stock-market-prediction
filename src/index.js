// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

 
// reportWebVitals();



//####################
import React from 'react';
import ReactDOM from 'react-dom';
 
import {CssBaseline} from '@mui/material';
import 'aos/dist/aos';
import reportwebvitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom';

 
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

 

root.render(
  <Router>
    <React.StrictMode>
      <App/>
      
    </React.StrictMode>
  </Router>
   
);

reportwebvitals();



