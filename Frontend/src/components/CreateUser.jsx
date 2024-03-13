import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    squad: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add a new user
      const response = await axios.post(
        "http://localhost:3001/addUser",
        formData
      );
      console.log("New user added:", response.data);

      // Redirect to the user list page after successful submission
      navigate("/userlist");
    } catch (error) {
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
            required
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <label>Squad:</label>
          <input
            type="number"
            name="squad"
            value={formData.squad}
            onChange={handleChange}
            placeholder="Enter your squad number"
            required
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
