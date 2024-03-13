import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "", // Change from 'email' to 'username'
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );

      // Handle the response from the server
      console.log(response.data);

      // Assuming successful login, navigate to the landing page
      navigate("/");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <button className="LoginBtn" type="submit">
            Login
          </button>
          {/* Add the Link component for redirection */}
          <p style={{ color: "blue", textAlign: "center", marginTop: "20px" }}>
            <Link to="/signup" style={{ textDecoration: "underline" }}>
              New user? Sign up here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
