import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-box">
                <div className="form-section">
                    <h2>SIGN UP</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Enter your username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Enter your phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="sign-up-btn">Sign Up</button>
                    </form>
                    <p className="login-link">Already registered? <a href="/SignIn">Sign In</a></p>
                </div>
                <div className="logo-section">
                    <img src="../public/logo.png" alt="Campus Circle Logo" className="sign-up-logo" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
