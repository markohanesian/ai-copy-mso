import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const PresetHero = () => {
    const [preset, setPreset] = useState(null);

    useEffect(() => {
        const fetchPreset = async () => {
            try {
                const response = await axios.get('http://localhost:5000/presets');
                if (response.data.length > 0) {
                    setPreset(response.data[0]); // Get the first preset as an example
                }
            } catch (error) {
                console.error("Error fetching presets:", error);
            }
        };

        fetchPreset();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '15vh',
                padding: 2,
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Your AI Copywriting Assistant
            </Typography>
            {/* Removed the preset suggestion text */}
        </Box>
    );
};

export default PresetHero;
