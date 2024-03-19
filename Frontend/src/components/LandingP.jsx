// LandingP.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LandingP.css";
import PropTypes from "prop-types";

// User Popup component
const UserPopup = ({ user, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing the popup
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Delay to match the animation duration
  };

  return (
    <div className="popup-overlay">
      <div className={`popup-content ${isClosing ? "closing" : ""}`}>
        <span className="close-btn" onClick={handleClose}>
          &times;
        </span>
        <h2>{user.username}</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Squad: {user.squad}</p>
      </div>
    </div>
  );
};

// Prop types validation for UserPopup component
UserPopup.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    squad: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

function LandingP() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [users, setUsers] = useState([]); // State to store the list of users
  const [hovered, setHovered] = useState(false); // State to track if the user data button is hovered
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  const [loggedIn, setLoggedIn] = useState(false); // State to track if the user is logged in
  const userListRef = useRef(null); // Ref to access the user list element
  const timeoutId = useRef(null); // Ref to store the timeout ID for hiding the user list

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://asap-project-wkv4.onrender.com//getUser"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle showing the user list on button hover
  const handleUserDataEnter = () => {
    setHovered(true);
    clearTimeout(timeoutId.current); // Clear any existing timeout
  };

  // Handle hiding the user list on button hover with delay
  const handleUserDataLeave = () => {
    timeoutId.current = setTimeout(() => {
      setHovered(false);
    }, 500); // Delay of 500ms before hiding the user list
  };

  // Handle user click to select user and display the popup
  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user
    if (loggedIn) {
      // No need to show the popup here, it will be rendered conditionally
    }
  };

  // Handle closing the popup
  const closePopup = () => {
    setSelectedUser(null); // Clear the selected user to close the popup
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://asap-project-wkv4.onrender.com//api/auth/logout"
      );
      console.log("Logout response:", response.data);
      console.log("Logout successful");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setLoggedIn(false); // Set the loggedIn state to false
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <h1>Class Lazy Workers</h1>
        <p>Embrace productivity, track your tasks, and beat procrastination!</p>
      </header>

      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-image"></div>
        <div className="hero-content">
          <h2>Your Productivity Journey Starts Here</h2>
          <p>
            Join Class Lazy Workers to log your pending hours, compare with
            peers, and level up your work habits.
          </p>
          {/* Buttons for login, sign up, user data, and logout */}
          <button className="customBtn" onClick={() => navigate("/login")}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log In
          </button>
          <button className="customBtn" onClick={() => navigate("/signup")}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign Up
          </button>
          <button
            className="customBtn"
            onMouseEnter={handleUserDataEnter}
            onMouseLeave={handleUserDataLeave}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            User Data
          </button>
          <button className="customBtn" onClick={handleLogout}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log Out
          </button>
        </div>
      </section>

      {/* User list */}
      {hovered && ( // Render the user list when hovered
        <div
          className="userList"
          ref={userListRef}
          onMouseEnter={handleUserDataEnter}
          onMouseLeave={handleUserDataLeave}
        >
          {/* Map through users and display username */}
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={selectedUser === user ? "selected" : ""}
            >
              {user.username}
            </div>
          ))}
        </div>
      )}

      {/* Render the user popup if a user is selected */}
      {selectedUser && <UserPopup user={selectedUser} onClose={closePopup} />}

      {/* Features section */}
      <section className="feature-section">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>User Registration and Login</h3>
            <p>
              Securely create an account and log in to your personalized
              workspace.
            </p>
          </div>
          <div className="feature-item">
            <h3>Log Pending Hours</h3>
            <p>
              Effortlessly track your pending hours for different tasks and
              projects.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>
            &quot;Join Class Lazy Workers to log your pending hours, compare with
            peers, and level up your work habits.&quot;
          </p>
          <p className="user-info">- Kane Marlin, Student</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Class Lazy Workers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingP;
