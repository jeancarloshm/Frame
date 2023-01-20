require('dotenv').config();
const PORT = process.env.APP_SERVER_PORT;

const express = require('express');
const path = require('path');
const app = express();

const viewsPath = path.join(__dirname,  '..', 'views');

app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});