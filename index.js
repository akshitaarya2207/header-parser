// index.js

const express = require('express');
const app = express();

// Serve static files from 'public' folder
app.use(express.static('public'));

// Root route - serves homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint - /api/whoami
app.get('/api/whoami', (req, res) => {
  // Get IP address (handle proxy)
  const ipaddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();

  // Get preferred language
  const language = req.headers['accept-language'];

  // Get software / user-agent
  const software = req.headers['user-agent'];

  // Respond with JSON
  res.json({
    ipaddress,
    language,
    software
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
