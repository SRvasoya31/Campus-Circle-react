import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import logo from "../assets/logo.png";
import { signUp } from "../services/authService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 🎯 Form Validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // 🔄 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await signUp(formData);

      if (response.success) {
        alert("✅ Sign Up Successful!");
        navigate("/signin"); // Redirect to SignIn page
      } else {
        alert(response.message || "❗ Sign Up Failed");
      }
    } catch (err) {
      console.error("Sign Up Error:", err);
      alert("⚠️ Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-box">
        {/* 🎯 Form Section */}
        <div className="form-section">
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            {/* 📩 Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            {/* 🔤 Username */}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <p className="error-msg">{errors.username}</p>}
            </div>

            {/* 🔒 Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>

            {/* 📞 Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error-msg">{errors.phone}</p>}
            </div>

            {/* 🔥 Signup Button */}
            <button type="submit" className="sign-up-btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* 🚪 Redirect to SignIn Link */}
          <p className="login-link">
            Already registered? <Link to="/signin">Sign In</Link>
          </p>
        </div>

        {/* 🎉 Logo Section */}
        <div className="logo-section">
          <img src={logo} alt="Campus Circle Logo" className="sign-up-logo" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
