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
                    fontSize: '3rem',
                }}
            >
                Generate marketing copy, powered by AI
            </Typography>
            <Typography
                variant="h6"
                component="p"
                sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '1rem',
                    marginTop: 2,
                }}
            >
                "Give me a fun product description for a women's fall jacket."
            </Typography>
        </Box>
    );
};

export default HomeHero;
