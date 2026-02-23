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
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AutoFixHighIcon sx={{ color: "#3700b3" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              fontFamily: "Prata, serif",
            }}
          >
            AI Copy by MSO
          </Typography>
          <Button
            color="inherit"
            href="https://github.com/markohanesian/ai-copy-mso"
            sx={{ color: "black" }}
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
