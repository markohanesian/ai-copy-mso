const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Route for fetching presets
app.get('/presets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM presets');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route for fetching tones
app.get('/tones', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tones');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route for fetching industries
app.get('/industries', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM industries');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route for generating copy
app.post('/generate', async (req, res) => {
    const { tone, industry, prompt } = req.body;

    try {
        // OpenAI API call
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini", // Update to the latest model
                messages: [
                    {
                        role: "system",
                        content: "You are a senior copywriter generating copy for products, social media, and other marketing and commerce.",
                    },
                    {
                        role: "user",
                        content: prompt, // Use the provided user prompt
                    },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const generatedCopy = response.data.choices[0].message.content.trim();

        // Save to database
        await pool.query('INSERT INTO generated_copies (copy, tone, industry) VALUES ($1, $2, $3)', [generatedCopy, tone, industry]);

        res.json({ copy: generatedCopy });
    } catch (err) {
        console.error('Error generating copy:', err);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
