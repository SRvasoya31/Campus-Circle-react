import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminSignup.css";

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/signup", { name, email, password });
      localStorage.setItem("adminToken", data.token);
      alert("Account created successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Signup failed", error.response.data);
      alert(error.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="admin-signup-container">
      <form onSubmit={handleSignup} className="admin-signup-form">
        <h2>Create Admin Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/admin/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;

