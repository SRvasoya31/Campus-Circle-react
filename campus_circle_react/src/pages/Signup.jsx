import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Signup.css'; // Assuming you have a Signup.css file

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>SIGN UP</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your Password" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" placeholder="Enter your Phone" />
        </div>
        <button className="signup-button">Sign Up</button>
        <p className="login-link">
          Already register? <Link to="/login">Login</Link> {/* Use Link here */}
        </p>
      </div>
      <div className="logo-container">
        <div className="logo">
          CAMPUS
          <br />
          CIRCLE
        </div>
      </div>
    </div>
  );
}

export default Signup;