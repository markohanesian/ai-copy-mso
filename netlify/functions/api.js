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

// Global path logger
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`);
    next();
});

// --- Routes ---

// Handle both /generate and /ai-generate for maximum compatibility
const generateHandler = async (req, res) => {
    console.log('Function received generation request:', req.body);
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

        const hfModel = process.env.HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.3';
        const hfUrl = `https://api-inference.huggingface.co/models/${hfModel}`;

        console.log(`FETCHING EXTERNAL: ${hfUrl}`);

        const hfPayload = {
            inputs: `<s>[INST] You are a professional copywriter for the ${industry} industry. Write a ${tone} marketing blurb for the following: ${prompt} [/INST]`,
            parameters: {
                max_new_tokens: 250,
                temperature: 0.7,
                return_full_text: false
            },
            options: {
                wait_for_model: true,
                use_cache: false
            }
        };

        const response = await fetch(hfUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HF_API_KEY}`,
                'Content-Type': 'application/json',
                'User-Agent': 'NetlifyFunction/1.0'
            },
            body: JSON.stringify(hfPayload)
        });

        console.log(`RESPONSE URL: ${response.url}`);
        console.log(`RESPONSE STATUS: ${response.status}`);

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse HF response as JSON:', text.substring(0, 100));
            return res.status(500).json({ error: 'Invalid response format from AI', details: text.substring(0, 200) });
        }

        if (!response.ok) {
            console.error('Hugging Face API Error Details:', JSON.stringify(data));
            return res.status(response.status).json({ error: 'Generation failed', details: data });
        }

        console.log('HF Response Status:', response.status);
        
        let generatedCopy = '';
        if (Array.isArray(data) && data.length > 0) {
            generatedCopy = data[0].generated_text || data[0].summary_text || "";
        } else if (data && data.generated_text) {
            generatedCopy = data.generated_text;
        }

        if (!generatedCopy) {
            console.error('Unexpected Hugging Face Response Format:', JSON.stringify(data));
            generatedCopy = typeof data === 'string' ? data : JSON.stringify(data);
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
};

app.post('/generate', generateHandler);
app.post('/ai-generate', generateHandler);

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
