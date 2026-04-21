import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          backgroundColor: "transparent", 
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <AutoFixHighIcon sx={{ color: "#ff5f00" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "white",
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              CopyAI
            </Typography>
          </Box>
          <Button
            color="inherit"
            href="https://github.com/markohanesian/ai-copy-mso"
            sx={{ 
              color: "white", 
              opacity: 0.7, 
              '&:hover': { opacity: 1, backgroundColor: 'rgba(255,255,255,0.05)' } 
            }}
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
