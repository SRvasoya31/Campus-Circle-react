import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>Contact Information</h3>
                <p>Address: Rajkot-Bhavnagar Highway, Gadhaka Rd, Tramba, Rajkot, Gujarat 360020</p>
                <p>Email: info@campuscircle.com</p>
                <p>Phone: +91 95832 58332</p>
            </div>
            <div className="footer-section">
                <h3>Popular Searches</h3>
                <ul>
                    <li>Contact Us</li>
                    <li>About Us</li>
                    <li>Hostel</li>
                    <li>Paying Guest</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Follow Us</h3>
                <ul>
                    <li><a href="https://twitter.com/CampusCircle">Twitter</a></li>
                    <li><a href="https://instagram.com/CampusCircle">Instagram</a></li>
                    <li><a href="https://linkedin.com/company/CampusCircle">LinkedIn</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
