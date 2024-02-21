const express = require("express");
const router = express.Router();

// Sample data (replace this with your actual data model or database)
let data = [
  { id: 1, name: "Suppuni" },
  { id: 2, name: "Sappuni" },
  { id: 3, name: "Manguni" },
  // Add more data as needed
];

// GET all data
router.get("/api/data", (req, res) => {
  res.json(data);
});

// GET a specific item by ID
router.get("/api/data/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// POST create new data
router.post("/api/data", (req, res) => {
  const newItem = req.body; // Assuming you send JSON data in the request body
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT update an item by ID
router.put("/api/data/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  data = data.map((item) => (item.id === itemId ? updatedItem : item));

  res.json(updatedItem);
});

// DELETE an item by ID
router.delete("/api/data/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  data = data.filter((item) => item.id !== itemId);

  res.json({ message: "Item deleted successfully" });
});

module.exports = router;
