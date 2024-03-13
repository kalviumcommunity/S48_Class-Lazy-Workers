// Import necessary modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { UserModel } = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

// Create an Express application
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("📦 Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:2983", // Replace with the client origin
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/", routes);

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      // Use bcrypt to compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.cookie("username", user.username);
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout endpoint
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("username", {
    secure: true, // Set to true if using HTTPS
    httpOnly: true, // Cookie cannot be accessed by client-side scripts
    sameSite: "strict", // Prevents CSRF attacks
    expires: new Date(0), // Expires the cookie immediately
  });
  res.json({ message: "Logout successful" });
});

// Add user endpoint
app.post("/addUser", async (req, res) => {
  try {
    const { username, email, password, name, squad } = req.body;

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists",
        message:
          "The provided username is already in use. Please login to your account.",
      });
    }

    // Check if the email is already taken
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
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
      username,
      email,
      password: hashedPassword,
      name,
      squad,
      // Include other fields as needed
    });

    console.log("New user added:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Error adding user:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      stack: err.stack,
    });
  }
});

// Get all users endpoint
app.get("/getUser", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user by ID endpoint
app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user by ID endpoint
app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        squad: req.body.squad,
      }
    );
    res.json(user);
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete user by ID endpoint
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete({ _id: id });
    res.json(user);
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

// Export the Express app
module.exports = app;
