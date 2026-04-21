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

        const hfModel = process.env.HF_MODEL || 'HuggingFaceH4/zephyr-7b-beta';
        const hfUrl = 'https://router.huggingface.co/v1/chat/completions';

        console.log(`FETCHING VIA ROUTER: ${hfUrl} with model ${hfModel}`);

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

        // Use a clean axios instance to avoid global config issues
        const instance = axios.create();
        const hfResp = await instance.post(hfUrl, hfPayload, {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                'Content-Type': 'application/json',
                'User-Agent': 'NetlifyFunction/1.0'
            },
        });

        console.log(`RESPONSE STATUS: ${hfResp.status}`);

        if (!hfResp.data?.choices?.[0]?.message?.content) {
            console.error('Unexpected Hugging Face Response Format:', JSON.stringify(hfResp.data));
            throw new Error('Invalid response from AI model');
        }

        const generatedCopy = hfResp.data.choices[0].message.content.trim();
        res.json({ copy: generatedCopy });

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
