const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;

// Define the /ping route
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});

