import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  // Initialize navigate hook from react-router-dom to handle navigation
  const navigate = useNavigate();

  // Initialize state variable formData to store form inputs
  const [formData, setFormData] = useState({
    username: "", // User's chosen username
    name: "", // Full name of the user
    email: "", // User's email address
    squad: "", // User's squad name or affiliation
    password: "", // User's chosen password
  });

  // handleChange function to update formData state variable with user inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the respective field in formData
    }));
  };

  // handleSubmit function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Navigate to the LandingP component after successful form submission
    navigate("/");
  };

  // JSX code to render the SignUp component
  return (
    <div className="container">
      <div className="signup-page">
        <h1>Sign Up</h1>
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

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <label htmlFor="squad">Squad:</label>
          <input
            type="text"
            id="squad"
            name="squad"
            placeholder="Enter your squad"
            value={formData.squad}
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

          <button className="SignUpBtn" type="submit">
            Sign Up
          </button>

          <p style={{ color: "blue", textAlign: "center", marginTop: "20px" }}>
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Already an existing user? Login here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Export the SignUp component for use in other parts of the application
export default SignUp;
