// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./UserData.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getUser");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (userId) => {
    console.log(`Update button clicked for user with ID ${userId}`);
    navigate(`/updateUser/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteUser/${userId}`);
      console.log(`User with ID ${userId} deleted`);

      const response = await axios.get("http://localhost:3001/getUser");
      setUsers(response.data);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  return (
    <div className="user-list-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              {/* <th>Email</th> */}
              <th>Squad</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                {/* <td>{user.email}</td> */}
                <td>{user.squad}</td>
                <td>
                  <button
                    className="action-button update-button"
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/CreateUser" className="add-user-button">
        Add User
      </Link>
    </div>
  );
}
