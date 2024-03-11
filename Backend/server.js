require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { UserModel } = require("./models/user");

const app = express();
const port = process.env.PORT || 3001;

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

app.post("/addUser", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
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

app.get("/getUser", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
