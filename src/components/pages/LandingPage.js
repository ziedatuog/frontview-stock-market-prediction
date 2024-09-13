import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChartLine, faShieldAlt, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Badge, Menu, MenuItem } from '@mui/material';
import { AxiosInstance } from '../Axios'; // Assuming you are using Axios for API requests
import heroImage from '../../assets/images/hero-image.jpg';
import logo from '../../assets/images/logo.jpg';
import DevelopersPage from './DevelopersPage';

const LandingPage = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // State for notification menu
  const [newCompanies, setNewCompanies] = useState([]); // State to store new companies
  const [previousCompanies, setPreviousCompanies] = useState([]); // State to store previous list of companies
  const [unreadCount, setUnreadCount] = useState(0); // Count of unread notifications
  const [notificationVisible, setNotificationVisible] = useState(false); // Notification visibility state
  const [showDevelopers, setshowDevelopers] = useState(false);
  // Function to fetch companies from the API
  // const fetchCompanies = async () => {
  //   try {
  //     const response = await AxiosInstance.get('/companies/');
  //     const data = response.data;

  //     // Check for newly added companies
  //     const newCompaniesList = data.filter(company => !previousCompanies.some(prevCompany => prevCompany.id === company.id));
  //     if (newCompaniesList.length > 0) {
  //       setUnreadCount(prev => prev + newCompaniesList.length); // Increment unread count
  //       setNotificationVisible(true); // Show notification
  //     }

  //     setPreviousCompanies(data); // Update the previous companies list
  //     setNewCompanies(newCompaniesList); // Update the new companies list
  //   } catch (error) {
  //     console.error('Error fetching companies:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCompanies(); // Fetch companies on component mount

  //   // Poll for updated companies every 5 seconds
  //   const interval = setInterval(() => {
  //     fetchCompanies();
  //   }, 5000);

  //   return () => clearInterval(interval); // Cleanup interval on unmount
  // }, [previousCompanies]); // Dependency on previousCompanies to detect changes

  // Handle notification icon click
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the notification menu
    setUnreadCount(0); // Mark notifications as read by clearing the count
    setNotificationVisible(false); // Hide notification banner
  };

  // Handle notification menu close
  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  // Handle click on a new company in the notification list
  const handleCompanyClick = (companyId) => {
    navigate(`/company/${companyId}`); // Redirect to company details page
    handleMenuClose(); // Close the menu after clicking
  };

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login'); // Adjust this path according to your routing
  };

    const handleDevelopersClick = () => {
      setshowDevelopers(!showDevelopers);
  };


  // Dismiss notification banner
  const closeNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="landing-page">
      {/* Notification Banner */}
      {notificationVisible && (
        <div className="notification active">
          <p>New company added!</p>
          <button onClick={closeNotification}>Dismiss</button>
        </div>
      )}

      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="StockPredict Logo" />
            <span>Ethio StockPredict</span>
          </div>
          <nav className="nav">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><button className="login-button" onClick={handleLoginClick}>Login</button></li>
            </ul>
          </nav>

          {/* Notification Icon */}
          {/* <div className="notification-icon">
            <Badge badgeContent={unreadCount} color="secondary">
              <FontAwesomeIcon icon={faBell} onClick={handleNotificationClick} />
            </Badge>
          </div> */}

           {/* Notification and Developers Icons */}
           <div className="icons-container">
            <div className="notification-icon">
              <Badge badgeContent={unreadCount} color="secondary">
                <FontAwesomeIcon icon={faBell} onClick={handleNotificationClick} />
              </Badge>
            </div>
            <div className="developers-icon">
              <button className="developers-button" onClick={handleDevelopersClick}>
                Developers
              </button>
            </div>
          </div>

          {/* Notification Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {newCompanies.length > 0 ? (
              newCompanies.map((company) => (
                <MenuItem
                  key={company.id}
                  onClick={() => handleCompanyClick(company.id)}
                >
                  New company added: {company.name} ({company.ticker})
                </MenuItem>
              ))
            ) : (
              <MenuItem>No new companies</MenuItem>
            )}
          </Menu>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Empower Your Investments with AI-Driven Stock Predictions</h1>
            <p>Stay ahead in the market with accurate and real-time stock forecasts powered by advanced machine learning algorithms.</p>
            <button className="cta-button" onClick={handleLoginClick}>Get Started</button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Stock market analysis" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
              <h3>Real-Time Analytics</h3>
              <p>Access up-to-the-minute data and insights to make informed investment decisions.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faRobot} className="feature-icon" />
              <h3>AI Predictions</h3>
              <p>Leverage powerful AI models that analyze market trends and predict future stock movements.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
              <h3>Secure & Reliable</h3>
              <p>Experience top-notch security and reliability with our trusted platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container about-content">
          <div className="about-text">
            <h2>About StockPredict</h2>
            <p>
              StockPredict is a cutting-edge platform designed for investors and traders who seek to maximize their returns through data-driven insights.
            </p>
            <p>
              Whether you're a seasoned investor or just starting out, StockPredict equips you with the tools and information you need to navigate the complex world of stock markets with confidence.
            </p>
            <button className="cta-button" onClick={handleLoginClick}>Join Now</button>
          </div>
        </div>
      </section>

       {/* Developers Section */}
       {showDevelopers && (
        <section id="developers" className="developers-section">
        <h2>Meet the Developers</h2>
        <DevelopersPage />  {/* Insert DevelopersPage component */}
        </section>

       )}
      

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container contact-content">
          <h2>Contact Us</h2>
          <p>Have questions or need support? Reach out to us anytime.</p>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <p>Phone: <a href="tel:+251923456787">+251923456787</a></p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 StockPredict. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
