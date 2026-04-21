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
                textAlign: 'center',
                padding: { xs: '2rem 1rem 1.5rem', md: '4rem 2rem 2rem' }, // Significantly reduced top padding
                gap: 1.5,
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '4rem' }, // Smaller heading on mobile
                    lineHeight: 1.1,
                    background: 'linear-gradient(to bottom, #ffffff 0%, #a0a0a0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    maxWidth: '800px',
                }}
            >
                Marketing copy, powered by AI
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    maxWidth: '500px',
                    fontWeight: 400,
                    lineHeight: 1.5
                }}
            >
                Generate captions for Instagram, catchy headlines for LinkedIn, 
                or product descriptions for your shop in seconds.
            </Typography>
        </Box>
    );
};

export default HomeHero;
