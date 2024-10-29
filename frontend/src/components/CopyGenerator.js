import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import CopySnackbar from './CopySnackbar.js'; // Import your Snackbar component

const CopyGenerator = () => {
    const [tone, setTone] = useState('');
    const [industry, setIndustry] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatedCopy, setGeneratedCopy] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

    const handleGenerate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/generate', {
                tone,
                industry,
                prompt,
            });
            setGeneratedCopy(response.data.copy);
        } catch (error) {
            console.error("Error generating copy:", error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCopy); // Copy the generated text to clipboard
        setSnackbarOpen(true); // Open the Snackbar
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Close the Snackbar
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                gap: 2,
                maxWidth: '400px',
                margin: 'auto',
            }}
        >
            <Typography variant="h6" component="h2" gutterBottom>
                Generate Marketing Copy
            </Typography>

            <TextField
                multiline
                rows={4}
                placeholder="Enter prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                variant="outlined"
                sx={{
                    backgroundColor: '#fff',
                    width: '100%',
                }}
            />

            <FormControl variant="outlined" sx={{ backgroundColor: '#fff', width: '100%' }}>
                <InputLabel id="tone-select-label">Tone</InputLabel>
                <Select
                    labelId="tone-select-label"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    label="Tone"
                >
                    <MenuItem value="casual">Casual</MenuItem>
                    <MenuItem value="formal">Formal</MenuItem>
                    {/* Add more options as needed */}
                </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ backgroundColor: '#fff', width: '100%' }}>
                <InputLabel id="industry-select-label">Industry</InputLabel>
                <Select
                    labelId="industry-select-label"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    label="Industry"
                >
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>
                    {/* Add more options as needed */}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={handleGenerate}
                sx={{
                    backgroundColor: '#121314',
                    color: '#fff',
                    width: '100%',
                }}
            >
                Generate
            </Button>

            {generatedCopy && (
                <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: 1, width: '100%', marginTop: 2 }}>
                    <Typography variant="body1">{generatedCopy}</Typography>
                    <Button onClick={handleCopy} sx={{ marginTop: "1rem" }} variant="outlined">
                        Copy to Clipboard
                    </Button>
                </Box>
            )}

            <CopySnackbar open={snackbarOpen} onClose={handleSnackbarClose} message="Copied to clipboard!" />
        </Box>
    );
};

export default CopyGenerator;
