import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => setEmail(e.target.value);

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("❗ Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset link sent to your email.");
      } else {
        setError(data.message || "❗ Something went wrong.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("⚠️ Unable to process your request. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password?</h2>

        {/* 🎯 Display messages */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* 🔗 Back to login link */}
        <div className="back-to-login">
          <Link to="/signin">🔙 Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
