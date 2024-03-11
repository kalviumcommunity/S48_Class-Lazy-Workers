// CreateUser.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";

// Component for creating a new user
export default function CreateUser() {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    username: "", // User's chosen username
    name: "", // User's full name
    email: "", // User's email address
    password: "", // User's chosen password
    squad: "", // User's squad number
  });

  // Navigation hook provided by react-router-dom
  const navigate = useNavigate();

  // Handler for input change events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to add a new user
      const response = await axios.post(
        "http://localhost:3001/addUser",
        formData
      );

      // Log successful response
      console.log("New user added:", response.data);

      // Redirect to user list page
      navigate("/userlist");
    } catch (error) {
      // Log error during submission
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="crUserContainer">
      <div className="create-user-container">
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for each user attribute */}
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required // Field is required
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required // Field is required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required // Field is required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required // Field is required
          />

          <label>Squad:</label>
          <input
            type="number"
            name="squad"
            value={formData.squad}
            onChange={handleChange}
            placeholder="Enter your squad number"
            required // Field is required
          />

          <button type="submit" className="customBtn2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
