import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate between pages
import axios from "axios"; // Import Axios for making HTTP requests
import "./LandingP.css"; // Import CSS file for styling

function LandingP() {
  // Initialize the navigate function to navigate between pages
  const navigate = useNavigate();

  // Function to navigate to the sign up page when clicking on the Sign Up button
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // Function to navigate to the login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Function to navigate to the user data page
  const handleUserData = () => {
    navigate("/userlist");
  };

  // Function to handle logout when the user is logged in
  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await axios.post(
        "http://localhost:3001/api/auth/logout"
      );
      console.log(response.data);
      console.log("Logout successful");
      // Clear the username cookie
      document.cookie =
        "username" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Navigate to the login page after successful logout
      navigate("/login");
    } catch (error) {
      // Handle logout error
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="landing-page">
      {/* Header section */}
      <header>
        <h1>Class Lazy Workers</h1>
        <p>Embrace productivity, track your tasks, and beat procrastination!</p>
      </header>

      {/* Hero section with image and content */}
      <section className="hero-section">
        <div className="hero-image"></div>
        <div className="hero-content">
          <h2>Your Productivity Journey Starts Here</h2>
          <p>
            "Class Lazy Workers has transformed the way I approach my work. I
            can now stay on top of my tasks and beat procrastination!"
          </p>
          {/* Buttons for login, sign up, user data, and logout */}
          <button className="customBtn" onClick={handleLoginClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log In
          </button>
          <button className="customBtn" onClick={handleSignUpClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign Up
          </button>
          <button className="customBtn" onClick={handleUserData}>
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
          {/* Include similar items for other features */}
        </div>
      </section>

      {/* Testimonial section */}
      <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>
            "Class Lazy Workers has transformed the way I approach my work. I
            can now stay on top of my tasks and beat procrastination!"
          </p>
          <p className="user-info">- Kane Marlin, Student</p>
        </div>
        {/* Include additional testimonials as needed */}
      </section>

      {/* Footer section */}
      <footer>
        <p>&copy; 2024 Class Lazy Workers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingP;
