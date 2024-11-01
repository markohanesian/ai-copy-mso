import React from 'react';
import { Box, Typography } from '@mui/material';

const HomeHero = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30vh',
                padding: 2,
                backgroundColor: '#f5f5f5', // Light background for a polished look
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '2rem', // Adjust the size as needed
                }}
            >
                Generate marketing copy powered by AI
            </Typography>
            <Typography
                variant="h6"
                component="p"
                sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '1.25rem',
                    marginTop: 2,
                    color: '#555', // A subtle color for the subtext
                }}
            >
                e.g., "Give me a fun product description for a women's fall jacket."
            </Typography>
        </Box>
    );
};

export default HomeHero;
