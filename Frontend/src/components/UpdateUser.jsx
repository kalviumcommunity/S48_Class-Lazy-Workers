import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUser.css";

export default function UpdateUser() {
  // Initialize state variable 'formData' to store user data
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    squad: "",
  });

  // Get user's id from the URL parameters
  const { userId } = useParams();

  // Initialize 'navigate' object for navigation
  const navigate = useNavigate();

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API endpoint
        const response = await axios.get(
          `http://localhost:3001/getUser/${userId}`
        );

        // Update the state variable 'formData' with fetched user data
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user data on the API endpoint
      await axios.put(`http://localhost:3001/updateUser/${userId}`, formData);

      // Navigate to the user list page
      navigate(`/userlist`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Return the UpdateUser component with the form to update user data
  return (
    <div className="updateUserContainer">
      <div className="update-user-container">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          {/* Name input field */}
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          {/* Email input field */}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />

          {/* Password input field */}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {/* Squad input field */}
          <label>Squad:</label>
          <input
            type="number"
            name="squad"
            value={formData.squad}
            onChange={handleChange}
            placeholder="Enter your squad number"
            required
          />

          {/* Submit button to update user data */}
          <button type="submit" className="customBtn3">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
