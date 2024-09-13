   
import React from 'react'; 
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import DevelopersPage from './components/pages/DevelopersPage';
import Home from './components/pages/Home';
import Create from './components/pages/Create';
import Edit from './components/pages/Edit';
import Delete from './components/pages/Delete';
import About from './components/pages/About';
// import CompanyCreate from './components/pages/CompanyCreate';
import CompanyEdit from './components/pages/CompanyEdit';
import Prediction from './components/pages/Prediction';
import Navbar from './components/NavBar';
import CompanyList from './components/pages/CompanyList';
import StockData from './components/pages/Stockdata'; // This would be the page that shows stock data for a specific company
import Login from './components/authentication/login';
import Register from './components/authentication/Register';
import ProtectedRoute from './components/authentication/ProtectedRoutes';
import PasswordResetRequest from './components/authentication/PasswordReserRequest';
import PasswordReset from './components/authentication/PasswordReset';
import './App.css';

const App = () => {
  const location = useLocation();
  const drawerWidth = 210; // Consistent casing
  const noNavbar = ['/register', '/', '/login', '/request/password_reset', '/password-reset'].includes(location.pathname) || location.pathname.includes("password");
  // const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password");

  return (
    <div className='App'>
      {noNavbar ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/Developers' element={<DevelopersPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/request/password_reset" element={<PasswordResetRequest />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />
        </Routes>
      ) : (
        <Navbar 
          drawerWidth={drawerWidth} // Use the correct casing here
          content={
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/create' element={<Create />} />
                {/* <Route path='/companyCreate' element={<CompanyCreate />} /> */}
                <Route path='/companyEdit/:id' element={<CompanyEdit />} />
                <Route path='/prediction' element={<Prediction />} />
                <Route path='/edit/:id' element={<Edit />} />
                <Route path='/delete/:id' element={<Delete />} />
                <Route path="/companies" element={<CompanyList />} />
                {/* <Route path="/companies/create" element={<CompanyCreate />} /> */}
                <Route path="/companies/:companyId/stockdata" element={<StockData />} />
              </Route>
            </Routes>
          }
        />
      )}
    </div>
  );
};

export default App;

