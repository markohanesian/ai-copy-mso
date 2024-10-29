import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import CopySnackbar from './CopySnackbar.js'; // Import your Snackbar component
import LoadingSkeleton from './LoadingSkeleton'; // Import the LoadingSkeleton component

const CopyGenerator = () => {
    const [tone, setTone] = useState('');
    const [industry, setIndustry] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatedCopy, setGeneratedCopy] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [tones, setTones] = useState([]); // State for tones
    const [industries, setIndustries] = useState([]); // State for industries
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        const fetchTones = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tones');
                setTones(response.data);
            } catch (error) {
                console.error("Error fetching tones:", error);
            }
        };

        const fetchIndustries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/industries');
                setIndustries(response.data);
            } catch (error) {
                console.error("Error fetching industries:", error);
            }
        };

        fetchTones();
        fetchIndustries();
    }, []);

    const handleGenerate = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('http://localhost:5000/generate', {
                tone,
                industry,
                prompt,
            });
            setGeneratedCopy(response.data.copy);
        } catch (error) {
            console.error("Error generating copy:", error);
        } finally {
            setLoading(false); // Set loading to false after generation
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
                <InputLabel id="tone-select-label">Select Tone</InputLabel>
                <Select
                    labelId="tone-select-label"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    label="Select Tone"
                >
                    <MenuItem value="">
                        <em>Select a tone</em>
                    </MenuItem>
                    {tones.map((tone) => (
                        <MenuItem key={tone.id} value={tone.tone}>
                            {tone.tone}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ backgroundColor: '#fff', width: '100%' }}>
                <InputLabel id="industry-select-label">Select Industry</InputLabel>
                <Select
                    labelId="industry-select-label"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    label="Select Industry"
                >
                    <MenuItem value="">
                        <em>Select an industry</em>
                    </MenuItem>
                    {industries.map((industry) => (
                        <MenuItem key={industry.id} value={industry.industry}>
                            {industry.industry}
                        </MenuItem>
                    ))}
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

            {loading ? ( // Conditional rendering for loading
                <LoadingSkeleton />
            ) : (
                generatedCopy && (
                    <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: 1, width: '100%', marginTop: 2 }}>
                        <Typography variant="body1">{generatedCopy}</Typography>
                        <Button onClick={handleCopy} sx={{ marginTop: "1rem" }} variant="outlined">
                            Copy to Clipboard
                        </Button>
                    </Box>
                )
            )}

            <CopySnackbar open={snackbarOpen} onClose={handleSnackbarClose} message="Copied to clipboard!" />
        </Box>
    );
};

export default CopyGenerator;
