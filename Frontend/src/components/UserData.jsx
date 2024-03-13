// Import necessary dependencies
import React, { useEffect, useState } from "react"; // Import the useState hook for managing state in functional components
import axios from "axios"; // Import axios for making HTTP requests
import { Link, useNavigate } from "react-router-dom"; // Import the Link component for navigation and useNavigate for programmatically navigating to other pages
import "./UserData.css";

// UserList component
export default function UserList() {
  // Initialize state variables
  const [users, setUsers] = useState([]); // Array to store user data fetched from the API
  const [loading, setLoading] = useState(true); // Indicates whether the user data is still being fetched or not
  const navigate = useNavigate(); // Function for navigating to other pages programmatically

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getUser"); // Make a GET request to the API endpoint to fetch user data
        setUsers(response.data); // Save the fetched data in the 'users' state variable
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors encountered during the fetch request
      } finally {
        setLoading(false); // Set loading to false once the request is complete, whether successful or not
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle update button click event
  const handleUpdate = (userId) => {
    console.log(`Update button clicked for user with ID ${userId}`);
    navigate(`/updateUser/${userId}`); // Navigate to the update user page with the given user ID
  };

  // Handle delete button click event
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteUser/${userId}`); // Make a DELETE request to the API endpoint to delete the user with the given user ID
      console.log(`User with ID ${userId} deleted`);

      const response = await axios.get("http://localhost:3001/getUser"); // Make a GET request to the API endpoint to fetch the updated list of users
      setUsers(response.data); // Save the updated list of users in the 'users' state variable
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error); // Log any errors encountered during the delete or fetch request
    }
  };

  // JSX to render the component
  return (
    <div className="user-list-container">
      {loading ? (
        <p>Loading...</p> // Display a loading message while fetching user data
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
      <Link to="/SignUp" className="add-user-button">
        Add User
      </Link>
    </div>
  );
}
