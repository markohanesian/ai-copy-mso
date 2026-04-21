const express = require('express');
const cors = require('cors');
const axios = require('axios');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors({
    origin: '*', // Allow all for serverless function
    methods: ['GET', 'POST']
}));
app.use(express.json());

// --- Routes ---

// Re-map the /generate endpoint for the function
app.post('/generate', async (req, res) => {
    console.log('Function received /generate request:', req.body);
    const { tone, industry, prompt } = req.body;

    if (!tone || !industry || !prompt) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        if (!process.env.HF_API_KEY) {
            console.error('CRITICAL: HF_API_KEY is not defined in environment variables.');
            return res.status(500).json({ error: 'API Key Configuration Error' });
        }

        // Log masked key for debugging (First 4 chars only)
        const maskedKey = process.env.HF_API_KEY.substring(0, 4) + '****';
        console.log(`API Key detected (masked): ${maskedKey}`);

        const hfModel = process.env.HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
        // Use the standard Inference API endpoint
        const hfUrl = `https://api-inference.huggingface.co/models/${hfModel}`;

        console.log(`Using Model: ${hfModel}`);
        console.log(`Using Endpoint: ${hfUrl}`);

        // Standard Inference API payload format
        const hfPayload = {
            inputs: `<s>[INST] You are a professional copywriter for the ${industry} industry. Write a ${tone} marketing blurb for the following: ${prompt} [/INST]`,
            parameters: {
                max_new_tokens: 250,
                temperature: 0.7,
                return_full_text: false
            },
            options: {
                wait_for_model: true
            }
        };

        const hfResp = await axios.post(hfUrl, hfPayload, {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
            timeout: 30000 // 30 second timeout for model loading
        });

        // Extract from standard Inference API response
        let generatedCopy = '';
        if (Array.isArray(hfResp.data) && hfResp.data.length > 0) {
            generatedCopy = hfResp.data[0].generated_text || hfResp.data[0].summary_text || "";
        } else if (hfResp.data && hfResp.data.generated_text) {
            generatedCopy = hfResp.data.generated_text;
        }

        if (!generatedCopy) {
            console.error('Unexpected Hugging Face Response Format:', JSON.stringify(hfResp.data));
            // Fallback for some models that return plain text or different objects
            generatedCopy = typeof hfResp.data === 'string' ? hfResp.data : JSON.stringify(hfResp.data);
        }

        res.json({ copy: generatedCopy.trim() });

    } catch (err) {
        // Detailed logging for Netlify Function logs
        const errorDetail = err.response?.data || err.message;
        console.error('Hugging Face API Error Details:', JSON.stringify(errorDetail));

        res.status(500).json({ 
            error: "Generation failed", 
            details: errorDetail 
        });
    }
});

// For health checks
app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: 'serverless' });
});

// Debug route to check environment status (Safe)
app.get('/debug-env', (req, res) => {
    res.json({ 
        has_key: !!process.env.HF_API_KEY,
        key_prefix: process.env.HF_API_KEY ? process.env.HF_API_KEY.substring(0, 4) : 'none',
        model: process.env.HF_MODEL || 'default'
    });
});

// Netlify uses /.netlify/functions/api by default
// But with redirects, we can map /generate to it.
module.exports.handler = serverless(app);
