require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to provide the API key securely
app.get('/api-key', (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
        res.json({ key: apiKey });
    } else {
        res.status(500).send("API key not configured");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
