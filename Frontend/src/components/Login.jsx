import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import necessary hooks from React Router
import axios from "axios"; // Import Axios for making HTTP requests
import "./Login.css"; // Import CSS file for styling

function Login() {
  const navigate = useNavigate(); // Get navigate function from React Router
  const [formData, setFormData] = useState({
    username: "", // Change from 'email' to 'username' for consistency with backend
    password: "",
  });

  // Function to update form data on input change
  const handleChange = (e) => {
    // Destructure the name and value from the target element (input field)
    const { name, value } = e.target;
    // Update the form data state using the previous state and the new name-value pair
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to set a cookie
  function setCookie(name, value, daysToExpire) {
    // Create a new Date object to set the expiry date
    let date = new Date();
    // Calculate the expiry time in milliseconds and add it to the current time
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    // Format the cookie string with the provided name, value, expiry date, and path
    document.cookie =
      name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to login endpoint with form data
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );

      console.log(response);
      // Set JWT token received from server in a cookie
      setCookie("token", response.data.token);
      setCookie("username", response.data.username);

      // Redirect user to the homepage after successful login
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
          {/* Username input */}
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
          {/* Password input */}
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
          {/* Login button */}
          <button className="LoginBtn" type="submit">
            Login
          </button>
          {/* Link to signup page */}
          <p style={{ color: "blue", textAlign: "center", marginTop: "20px" }}>
            {/* Add link to the signup page */}
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
