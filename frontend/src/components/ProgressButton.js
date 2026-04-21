import * as React from 'react';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CircularProgress from '@mui/material/CircularProgress';

const ProgressButton = ({ loading, onClick, label }) => {
  return (
    <Button
      variant="contained"
      disabled={loading}
      onClick={onClick}
      endIcon={!loading && <AutoAwesomeIcon />}
      sx={{
        width: "100%",
        py: 1.5,
        backgroundColor: "#ff5f00",
        color: "white",
        fontSize: "1rem",
        fontWeight: 700,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(255, 95, 0, 0.3)',
        '&:hover': {
          backgroundColor: "#e65600",
          boxShadow: '0 6px 25px rgba(255, 95, 0, 0.4)',
        },
        '&.Mui-disabled': {
          backgroundColor: "rgba(255, 95, 0, 0.3)",
          color: "rgba(255, 255, 255, 0.5)",
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: 'white' }} />
      ) : (
        label
      )}
    </Button>
  );
};

export default ProgressButton;
