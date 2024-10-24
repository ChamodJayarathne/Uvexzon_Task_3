import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import img1 from "../assets/img1.jpeg";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      console.log("User Info:", decoded);
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="login-form-container">
        <div className="form-wrapper">
          <h1 className="title">Welcome back!</h1>
          <p className="subtitle">
            Enter your Credentials to access your account
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Email address</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Enter your email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                required
              />
              <a href="/forgot-password" className="forgot-password">
                forgot password
              </a>
            </div>
            <div className="form-group checkbox-container">
              <input type="checkbox" className="checkbox" required />
              <label className="checkbox-label">Remember for 30 days</label>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>

          <div className="divider">Or</div>

          <div className="social-login">
            <button className="google-button">
              <img
                src={google}
                alt="Google"
                className="icon"
                onClick={handleGoogleLogin}
              />{" "}
              Sign in with Google
            </button>
            <button className="apple-button">
              <img src={apple} alt="Apple" className="icon" /> Sign in with
              Apple
            </button>
          </div>

          <p className="signup-text">
            Don't have an account?{" "}
            <a href="/" className="link">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="image-container">
        <img src={img1} alt="Login" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
