import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 2,
                mt: 'auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" align="center">
                        Built by
                    </Typography>
                    <Link
                        href="https://github.com/markohanesian"
                        target="_blank"
                        rel="noopener"
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontWeight: 600,
                            fontSize: '1rem',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: '#ff5f00',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <GitHubIcon fontSize="small" />
                        @markohanesian
                    </Link>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, opacity: 0.5 }}>
                        © 2026 AI Copy Lab
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
