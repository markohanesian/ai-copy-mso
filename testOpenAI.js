const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

const generateCopy = async () => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a senior copywriter generating copy for products, social media, and other marketing and commerce.",
                    },
                    {
                        role: "user", // Add a user message for context
                        content: "Write a short product description for a women's black leather jacket for winter.",
                    },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Log the correct variable to display the generated response
        console.log("Generated Response:", response.data.choices[0].message.content);
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
    }
};

generateCopy();
