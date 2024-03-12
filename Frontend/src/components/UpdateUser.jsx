import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUser.css";

export default function UpdateUser() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    squad: "",
  });

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getUser/${userId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/updateUser/${userId}`, formData);
      navigate(`/userlist`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="updateUserContainer">
      <div className="update-user-container">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
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
