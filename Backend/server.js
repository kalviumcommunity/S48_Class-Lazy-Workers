// Import necessary modules
require("dotenv").config(); // Load environment variables from a .env file
const express = require("express"); // Import Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
const cors = require("cors"); // Import CORS for enabling cross-origin requests
const routes = require("./routes"); // Import custom routes
const { UserModel } = require("./models/user"); // Import User model
const cookieParser = require("cookie-parser"); // Import cookie-parser for handling cookies
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import JWT library for token generation

// Create an Express application
const app = express(); // Initialize Express application
const port = process.env.PORT || 3001; // Define port number from environment variables or default to 3001

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // Connect to MongoDB URI specified in environment variables
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new server discovery and monitoring engine
  })
  .then(() => {
    console.log("📦 Connected to MongoDB"); // Log successful connection
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error); // Log MongoDB connection error
  });

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(
  cors()
);
app.use(cookieParser()); // Parse cookies
app.use("/", routes); // Use custom routes

// Login endpoint with JWT token
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  try {
    const user = await UserModel.findOne({ username }); // Find user by username in the database

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed password

      if (passwordMatch) {
        // Generate JWT token with user's username as payload
        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h", // Token expiration time
          }
        );

        // Set token in a cookie for client-side storage
        res.cookie("token", token, {
          httpOnly: true, // Cookie cannot be accessed by client-side scripts
          sameSite: "strict", // Prevents CSRF attacks
          secure: true, // Set to true if using HTTPS
        });
        res.cookie("username", username, {
          httpOnly: true, // Cookie cannot be accessed by client-side scripts
          sameSite: "strict", // Prevents CSRF attacks
          secure: true, // Set to true if using HTTPS
        });

        // Respond with success message and username
        res.json({ message: "Login successful", username, token });
      } else {
        // Respond with error for invalid username or password
        res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      // Respond with error for invalid username or password
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    // Log the error with more details
    console.error("❌ Error during login:", err.message);
    console.error("Error stack trace:", err.stack);

    // Optionally, you can also send the error message to the client
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Logout endpoint to clear JWT token cookie
app.post("/api/auth/logout", (req, res) => {
  // Clear token cookie from client-side
  res.clearCookie("token", {
    secure: true, // Set to true if using HTTPS
    httpOnly: true, // Cookie cannot be accessed by client-side scripts
    sameSite: "strict", // Prevents CSRF attacks
    expires: new Date(0), // Expires the cookie immediately
  });

  // Respond with success message
  res.json({ message: "Logout successful" });
});

// Add user endpoint
app.post("/addUser", async (req, res) => {
  try {
    const { username, email, password, name, squad } = req.body; // Get user details from request body

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        // Respond with error if username already exists
        error: "Username already exists",
        message:
          "The provided username is already in use. Please login to your account.",
      });
    }

    // Check if the email is already taken
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        // Respond with error if email already exists
        error: "Email already exists",
        message:
          "The provided email is already associated with an account. Please login to your account.",
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user with the hashed password
    const newUser = await UserModel.create({
      // Create new user in database
      username,
      email,
      password: hashedPassword,
      name,
      squad,
      // Include other fields as needed
    });

    console.log("New user added:", newUser); // Log new user
    res.status(201).json(newUser); // Respond with success and newly created user
  } catch (err) {
    console.error("❌ Error adding user:", err); // Log error
    res.status(500).json({
      // Respond with internal server error and error details
      error: "Internal Server Error",
      message: err.message,
      stack: err.stack,
    });
  }
});

// Get all users endpoint
app.get("/getUser", async (req, res) => {
  try {
    const users = await UserModel.find(); // Find all users in database
    res.json(users); // Respond with found users
  } catch (err) {
    console.error("❌ Error fetching users:", err); // Log error
    res.status(500).json({ error: "Internal Server Error" }); // Respond with internal server error
  }
});

// Get user by ID endpoint
app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get user ID from request parameters
    const user = await UserModel.findById({ _id: id }); // Find user by ID in database
    res.json(user); // Respond with found user
  } catch (err) {
    console.error("❌ Error fetching user:", err); // Log error
    res.status(500).json({ error: "Internal Server Error" }); // Respond with internal server error
  }
});

// Update user by ID endpoint
app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get user ID from request parameters
    const user = await UserModel.findByIdAndUpdate(
      // Find and update user by ID
      { _id: id },
      {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        squad: req.body.squad,
      }
    );
    res.json(user); // Respond with updated user
  } catch (err) {
    console.error("❌ Error updating user:", err); // Log error
    res.status(500).json({ error: "Internal Server Error" }); // Respond with internal server error
  }
});

// Delete user by ID endpoint
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get user ID from request parameters
    const user = await UserModel.findByIdAndDelete({ _id: id }); // Find and delete user by ID
    res.json(user); // Respond with deleted user
  } catch (err) {
    console.error("❌ Error deleting user:", err); // Log error
    res.status(500).json({ error: "Internal Server Error" }); // Respond with internal server error
  }
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    // Start server listening on specified port
    console.log(`🚀 Server running on PORT: ${port}`); // Log server start
  });
}

// Export the Express app
module.exports = app; // Export Express application for testing or use in other files
