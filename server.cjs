const express = require('express');
const path = require('path');
const fs = require('fs');

// Uncaught exception logger to help diagnose server crashes on Hostinger
process.on('uncaughtException', (err) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, 'server-error.log'), 
      `Uncaught Exception on ${new Date().toISOString()}:\nMessage: ${err.message}\nStack:\n${err.stack}\n`
    );
  } catch (e) {
    console.error('Failed to write error log:', e);
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, 'server-error.log'), 
      `Unhandled Rejection on ${new Date().toISOString()}:\nPromise: ${promise}\nReason: ${reason}\n`
    );
  } catch (e) {
    console.error('Failed to write error log:', e);
  }
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 8080; // Hostinger sets process.env.PORT dynamically

// Serve static assets compiled in dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all routes to index.html to support React routing (hash or clean routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Bind to the port/socket provided by the environment
app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}`);
});
