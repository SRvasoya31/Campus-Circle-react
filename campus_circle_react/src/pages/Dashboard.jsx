// src/pages/Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../pages/Dashboard.css';  // You can style this page as you like

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Welcome to your Dashboard!</h1>
        <p>Here you can access your profile, events, and more.</p>
        {/* Future components like user stats, notifications, etc. can be added here */}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
