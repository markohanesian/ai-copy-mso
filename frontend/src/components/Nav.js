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
// import MenuIcon from '@mui/icons-material/Menu'; // Uncomment if you want to implement a menu in the future

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fe5722" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AutoFixHighIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#ffffff" }}
          >
            AI Copy by MSO{" "}
          </Typography>
          <Button
            color="inherit"
            href="https://github.com/markohanesian/ai-copy-mso"
            sx={{ color: "#ffffff" }}
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
