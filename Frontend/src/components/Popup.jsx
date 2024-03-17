import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const Popup = ({ user }) => {
  return (
    <div className="popup">
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Squad: {user.squad}</p>
    </div>
  );
};

// Define PropTypes for the user prop
Popup.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    squad: PropTypes.number.isRequired,
  }).isRequired,
};

export default Popup;
