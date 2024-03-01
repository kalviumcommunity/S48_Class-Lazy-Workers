require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const UserModel = require("./models/user");

const app = express();
const port = process.env.PORT || 3001; // Use the PORT from environment variable or default to 3001

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

app.use(express.json());
app.use(cors());
app.use("/", routes);

// Add route to handle user creation
app.post("/addUser", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    console.log("New user added:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Error adding user:", err);

    // Provide more information about the error in the response
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      stack: err.stack,
    });
  }
});

// Fetch users from MongoDB
app.get("/getUser", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
