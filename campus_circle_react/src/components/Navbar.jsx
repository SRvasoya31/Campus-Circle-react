// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="logo-a">
        <Link to="/">
          <img src="/assets/Campus_Circle.jpg" alt="Campus Circle" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/pgdetailform">Add PG</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="user-menu">
        {user ? (
          <>
            <span className="username">👋 Hi, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <button className="login-btn" onClick={() => navigate('/signin')}>Log In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
