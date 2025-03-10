import React, { useState } from 'react';
import './SignIn.css';
// import logo from '../public/Campus_Circle.jpg; // Adjust path based on your project structure

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-box">
                <div className="form-section">
                    <h2>Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="sign-in-btn">Sign In</button>
                    </form>
                    <div className="additional-links">
                        <a href="/forgot-password">Forgot Password?</a>
                        <a href="/sign-up">Don't have an account? Sign Up</a>
                    </div>
                </div>
                <div className="logo-section">
                    <img src="../public/logo.png" alt="Campus Circle Logo" className="sign-in-logo" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
