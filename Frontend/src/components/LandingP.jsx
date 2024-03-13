import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate between pages
import "./LandingP.css";

function LandingP() {
  const navigate = useNavigate(); // Create a navigate function

  const handleSignUpClick = () => {
    // Redirect to the signup page
    navigate("/signup");
  };

  const handleUserData = () => {
    // Redirect to the userdata page
    navigate("/userlist");
  };

  // Function to handle logout function when user is logged in
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/logout"
      );
      console.log(response.data);
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Class Lazy Workers</h1>
        <p>Embrace productivity, track your tasks, and beat procrastination!</p>
      </header>

      <section className="hero-section">
        <div className="hero-image"></div>
        <div className="hero-content">
          <h2>Your Productivity Journey Starts Here</h2>
          <p>
            Join Class Lazy Workers to log your pending hours, compare with
            peers, and level up your work habits.
          </p>
          {/* Updated button with span elements for hover animation */}
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

      <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>
            `&quot;`Class Lazy Workers has transformed the way I approach my work. I
            can now stay on top of my tasks and beat procrastination!
          </p>
          <p className="user-info">- Kane Marlin, Student</p>
        </div>
        {/* Include additional testimonials as needed */}
      </section>

      <footer>
        <p>&copy; 2024 Class Lazy Workers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingP;
