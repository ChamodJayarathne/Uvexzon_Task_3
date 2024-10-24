/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.jpeg";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/login"; 
      } else {
        
        alert(data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleGoogleSignup = () => {
    window.open("http://localhost:8080/auth/google/", "_self");
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
      <div className="signup-form-container">
        <div className="form-wrapper">
          <h1 className="title">Get Started Now</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Enter your name"
                onChange={handleInputChange}
                required
              />
            </div>
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
            </div>
            <div className="form-group checkbox-container">
              <input type="checkbox" className="checkbox" required />
              <label className="checkbox-label">
                I agree to{" "}
                <a href="" className="link">
                  terms & policy
                </a>
              </label>
            </div>
            <button className="signup-button" type="submit">
              Sign up
            </button>
          </form>
          <div className="divider">Or</div>
          <div className="social-login">
            <button className="google-button">
              <img
                src={google}
                alt="Google"
                className="icon"
                onClick={handleGoogleSignup}
              />{" "}
              Sign up with Google
            </button>
            <button className="apple-button">
              <img src={apple} alt="Apple" className="icon" /> Sign up with
              Apple
            </button>
          </div>
          <p className="signin-text">
            Have an account?{" "}
            <a href="/login" className="link">
              Sign In
            </a>
          </p>
        </div>
      </div>
      <div className="image-container">
        <img src={img1} alt="Sign up" className="signup-image" />
      </div>
    </div>
  );
};

export default SignUp;
