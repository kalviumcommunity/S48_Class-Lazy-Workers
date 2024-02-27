import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    squadNumber: "",
    email: "",
    githubUsername: "",
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
    // Add any additional logic for handling form submission here
    console.log("Form submitted:", formData);

    // Redirect to LandingP after sign-up
    navigate("/");
  };

  return (
    <div className="container">
      <div className="signup-page">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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

          <label htmlFor="squadNumber">Squad Number:</label>
          <input
            type="text"
            id="squadNumber"
            name="squadNumber"
            placeholder="Enter your squad number"
            value={formData.squadNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Kalvium email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="githubUsername">GitHub Username:</label>
          <input
            type="text"
            id="githubUsername"
            name="githubUsername"
            placeholder="Enter your Github username"
            value={formData.githubUsername}
            onChange={handleChange}
            required
          />

          <button class="SignUpBtn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
