import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [adminData, setAdminData] = useState({
    totalPGs: 0,
    totalBookings: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Example: Fetch data from API (replace with your API calls)
    setAdminData({
      totalPGs: 50,
      totalBookings: 100,
      totalUsers: 200,
    });
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-card">
        <h3>Total PGs</h3>
        <p>{adminData.totalPGs}</p>
      </div>
      <div className="dashboard-card">
        <h3>Total Bookings</h3>
        <p>{adminData.totalBookings}</p>
      </div>
      <div className="dashboard-card">
        <h3>Total Users</h3>
        <p>{adminData.totalUsers}</p>
      </div>
    </div>
  );
};

export default Dashboard;
