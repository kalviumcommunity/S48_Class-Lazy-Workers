import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    squad: "", // Change to an empty string or default numerical value
    password: "",
  });

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the squad field only if the entered value is a number
    if (name === "squad" && isNaN(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to add a new user
      const response = await axios.post(
        "https://asap-project-wkv4.onrender.com//addUser",
        formData
      );

      // Log successful response
      console.log("New user added:", response.data);

      // Display the sign-up success message
      setSignUpSuccess(true);

      // After a delay, reset the success message and navigate to UserData.jsx
      setTimeout(() => {
        setSignUpSuccess(false);
        navigate("/userlist");
      }, 1000); // 1000 milliseconds (1 seconds) delay
    } catch (error) {
      // Log error during submission
      console.error("Error adding user:", error);
    }
  };

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
            type="number" // Change input type to "number"
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

          {/* Display pop-up on successful sign-up */}
          {signUpSuccess && (
            <div className="popup">
              <p>Sign Up Successful!</p>
            </div>
          )}

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

export default SignUp;
