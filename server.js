require("dotenv").config(); // Load environment variables from .env file
console.log("Environment variables loaded:", process.env);
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

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

const db = mongoose.connection;

app.use(express.json());
app.use("/", routes);

// Define the /ping route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Define the /status route to show database connection status
app.get("/status", (req, res) => {
  const databaseStatus = db.readyState === 1 ? "connected" : "disconnected";
  res.json({
    message: "o_O",
    database: databaseStatus,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
