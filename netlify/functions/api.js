const express = require('express');
const cors = require('cors');
const axios = require('axios');
const serverless = require('serverless-http');

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

        const generatedCopy = hfResp.data.choices[0].message.content.trim();
        res.json({ copy: generatedCopy });

    } catch (err) {
        const errorDetail = err.response?.data || err.message;
        console.error('Hugging Face API Error:', errorDetail);
        res.status(500).json({ error: "Generation failed", details: errorDetail });
    }
});

// For health checks
app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: 'serverless' });
});

// Netlify uses /.netlify/functions/api by default
// But with redirects, we can map /generate to it.
module.exports.handler = serverless(app);
