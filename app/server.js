const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Main route - returns app info as JSON
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from EKS with Monitoring!',
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint - Kubernetes uses this to verify the app is alive
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});