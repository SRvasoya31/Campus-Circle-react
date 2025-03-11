import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import logo from "../assets/Campus_Circle.jpg"; // Adjust path as needed

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-a">
        <img src="../public/Campus_Circle.jpg" alt="Campus Circle" />
        {/* CAMPUS CIRCLE */}
        </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Login Button */}
      <Link to="/signin">
        <button className="login-btn">Log In</button>
      </Link>
    </nav>
  );
};

export default Navbar;
