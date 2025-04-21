

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // ✅ Import Auth Context
import "./SignIn.css";

const SignIn = () => {
  const { login } = useContext(AuthContext); // ✅ Use context for login
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🎯 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔒 Basic form validation
  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setError("❗ Invalid email format.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("❗ Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        login(data.user, data.token); // ✅ Context handles session storage now
        alert("✅ Signed in successfully!");

        // ✅ Redirect based on user role
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setError(data.message || "❗ Invalid email or password.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("⚠️ Unable to connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <div className="form-section">
          <h2>Welcome Back!</h2>

          {/* 🛑 Show error message */}
          {error && <p className="error-message">{error}</p>}

          {/* 🔥 Sign In Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="sign-in-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <br/>

          {/* 🔗 Additional Links */}
          <div className="additional-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <br />
            Don't have an account? <Link to="/signup">Sign Up</Link>
            <br />
            {/* <Link to="/admin/login" className="admin-login-link">🔐 Admin Login</Link> */}
          </div>
        </div>

        {/* 🌟 Logo Section */}
        <div className="logo-section">
          <img src="/assets/logo.png" alt="Campus Circle Logo" className="sign-in-logo" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
