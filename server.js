const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(morgan('dev')); // Logs requests to the console
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || '*',
    methods: ['GET', 'POST']
}));
app.use(express.json()); // Built-in alternative to body-parser

// --- Health Check Routes ---

// Confirm server is alive
app.get('/', (req, res) => {
    res.send('AI Copywriting Backend is running.');
});

// Check API status and configured model
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        hf_model: process.env.HF_MODEL || 'HuggingFaceH4/zephyr-7b-beta' 
    });
});

// --- AI Generation Route ---

app.post('/generate', async (req, res) => {
    const { tone, industry, prompt } = req.body;

    // Basic validation
    if (!tone || !industry || !prompt) {
        return res.status(400).json({ error: 'Missing required fields: tone, industry, or prompt' });
    }

    try {
        const hfModel = process.env.HF_MODEL || 'HuggingFaceH4/zephyr-7b-beta';
        const hfUrl = 'https://router.huggingface.co/v1/chat/completions';

        const hfPayload = {
            model: hfModel,
            messages: [
                { 
                    role: "system", 
                    content: `You are a professional copywriter for the ${industry} industry.` 
                },
                { 
                    role: "user", 
                    content: `Write a ${tone} marketing blurb for the following: ${prompt}` 
                }
            ],
            max_tokens: 250,
            temperature: 0.7
        };

        const hfResp = await axios.post(hfUrl, hfPayload, {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Extracting text from the OpenAI-compatible response format
        const generatedCopy = hfResp.data.choices[0].message.content.trim();

        res.json({ copy: generatedCopy });

    } catch (err) {
        // Detailed logging for the developer
        const errorDetail = err.response?.data || err.message;
        console.error('Hugging Face API Error:', errorDetail);

        res.status(500).json({ 
            error: "Generation failed", 
            details: errorDetail 
        });
    }
});

// --- Server Start ---
app.listen(port, () => {
    console.log(`\n🚀 Server running at http://localhost:${port}`);
    console.log(`🤖 Using Model: ${process.env.HF_MODEL || 'HuggingFaceH4/zephyr-7b-beta'}`);
    
    if (!process.env.HF_API_KEY) {
        console.warn('⚠️  Warning: HF_API_KEY is missing from .env file. Requests will fail.');
    }
});