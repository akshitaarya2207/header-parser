// index.js

const express = require('express');
const app = express();
const path = require('path');

// Serve static files from 'public' folder
app.use(express.static('public'));

// Root route - serves homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint - /api/whoami
app.get('/api/whoami', (req, res) => {
  // Get IP address (handle proxy and IPv6)
  let ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  ipaddress = ipaddress.split(',')[0].trim();
  if (ipaddress.startsWith('::ffff:')) {
    ipaddress = ipaddress.replace('::ffff:', '');
  }

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
