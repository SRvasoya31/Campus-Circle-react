import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/manage-pgs">Manage PGs</Link>
        </li>
        <li>
          <Link to="/admin/manage-bookings">Manage Bookings</Link>
        </li>
        <li>
          <Link to="/admin/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
