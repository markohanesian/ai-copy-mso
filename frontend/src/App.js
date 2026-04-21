import React from "react";
import CopyGenerator from "./components/CopyGenerator";
import Nav from "./components/Nav";
import "./App.css";
import HomeHero from "./components/HomeHero";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5f00', // Brand Orange
    },
    background: {
      default: '#020202',
      paper: 'rgba(20, 20, 20, 0.7)', // Glass effect
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            '&:hover fieldset': {
              borderColor: 'rgba(255, 95, 0, 0.5)',
            },
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <Box className="aurora-container">
          <Box className="aurora" />
          <Box className="aurora-2" />
        </Box>
        <Nav />
        <Box 
          id="main" 
          sx={{ 
            position: 'relative', 
            zIndex: 1, 
            pt: { xs: 0, md: 2 }, 
            flex: 1 
          }}
        >
          <HomeHero />
          <CopyGenerator />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
