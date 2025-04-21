import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/manage-pgs">Manage PGs</Link>
      <Link to="/admin/manage-bookings">Manage Bookings</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
