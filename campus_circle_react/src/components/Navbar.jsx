import React from "react";
import "./Navbar.css"; // Import the CSS file

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
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      {/* Login Button */}
      <button className="login-btn">Log In</button>
    </nav>
  );
};

export default Navbar;
