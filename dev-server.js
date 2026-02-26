const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files 

// Simulate Vercel Serverless Function specifically for finding images
app.get('/api/images', async (req, res) => {
    try {
        const handler = require('./api/images.js');
        await handler(req, res);
    } catch (e) {
        console.error("Local API Handler error:", e);
        res.status(500).json({ error: e.message });
    }
});

// Provide Firebase Config to frontend (this avoids exposing it hardcoded in index.html)
app.get('/api/config', (req, res) => {
    res.json({
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Local dev server running at http://localhost:${port}`);
    console.log(`Make sure to have your Firebase variables populated in .env`);
});
