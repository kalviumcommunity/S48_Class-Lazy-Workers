import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Assuming successful login, navigate to the landing page
    navigate("/");
  };

  return (
    <div className="container">
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
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
