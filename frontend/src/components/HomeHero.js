import React from 'react';
import { Box, Typography } from '@mui/material';

const HomeHero = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textAlign: 'center',
                padding: 3,
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontFamily: '"Josefin Sans", sans-serif', // New font
                    fontWeight: 700,
                    fontSize: '2rem',
                }}
            >
                Generate marketing copy, powered by AI
            </Typography>
        </Box>
    );
};

export default HomeHero;
