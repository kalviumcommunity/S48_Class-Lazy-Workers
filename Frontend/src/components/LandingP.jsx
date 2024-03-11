import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate between pages
import "./LandingP.css";

function LandingP() {
  // Initialize the navigate function to navigate between pages
  const navigate = useNavigate();

  // Function to navigate to the signup page
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // Function to navigate to the login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Function to navigate to the userdata page
  const handleUserData = () => {
    navigate("/userlist");
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
            Join Class Lazy Workers to log your pending hours, compare with
            peers, and level up your work habits.
          </p>
          {/* Updated button with span elements for hover animation */}
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
