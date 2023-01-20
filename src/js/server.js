require('dotenv').config();
const PORT = process.env.APP_SERVER_PORT;
const express = require('express');
const path = require('path');
const app = express();
const distPath = path.join(__dirname, '..', 'dist')

// Serve the HTML, CSS and JS files using express.static middleware
app.use(express.static(distPath));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});