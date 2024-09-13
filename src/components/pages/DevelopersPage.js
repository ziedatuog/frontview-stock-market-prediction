import React from 'react';
import './DevelopersPage.css'; // Custom CSS
import zelalemImage from '../../assets/images/zelalem.JPG';
import hannaImage from '../../assets/images/hanna.JPG';
import ashenafiImage from '../../assets/images/ashenafi.JPG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faBrain, faDesktop } from '@fortawesome/free-solid-svg-icons'; // Import icons

const DevelopersPage = () => {
    const developers = [
        {
            name: 'Zelalem Birhan',
            role: 'Backend Developer',
            description: 'Zelalem is responsible for designing and implementing the backend API, database, and real-time data processing. He ensures that the stock market prediction system runs smoothly and can handle a large amount of data efficiently.',
            imageUrl: zelalemImage,  // Replace with actual image paths or URLs
            linkedIn: 'https://linkedin.com/in/zelalem-birhan',
            icon: faServer, // Backend icon
        },
        {
            name: 'Hanna Meseret',
            role: 'Machine Learning Model Developer',
            description: 'Hanna specializes in developing the machine learning models used to predict stock market trends. She integrates advanced algorithms to analyze historical data and provide accurate real-time predictions.',
            imageUrl: hannaImage,
            linkedIn: 'https://linkedin.com/in/hanna-meseret',
            icon: faBrain, // Machine learning icon
        },
        {
            name: 'Ashenafi Dereje',
            role: 'Frontend Developer',
            description: 'Ashenafi is the frontend developer responsible for building a responsive and user-friendly interface. He ensures that the stock market data and predictions are displayed effectively for users.',
            imageUrl: ashenafiImage,
            linkedIn: 'https://linkedin.com/in/ashenafi-dereje',
            icon: faDesktop, // Frontend icon
        },
    ];

    return (
        <div className="developers-page">
            <h1>Meet the Team</h1>
            <div className="developer-cards">
                {developers.map((developer, index) => (
                    <div key={index} className="developer-card">
                        <img src={developer.imageUrl} alt={developer.name} className="developer-image" />
                        <h2>{developer.name}</h2>
                        <div className="role-icon">
                            <FontAwesomeIcon icon={developer.icon} className="icon" />
                            <h3>{developer.role}</h3>
                        </div>
                        <p>{developer.description}</p>
                        <a href={developer.linkedIn} target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DevelopersPage;
