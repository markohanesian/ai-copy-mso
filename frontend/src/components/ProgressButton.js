import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

const ProgressButton = ({ loading, onClick, label }) => {
  const buttonSx = {
    ...(loading && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
    width: "-webkit-fill-available",
    backgroundColor: "#3700b3",
    textTransform: "uppercase",
    fontWeight: "bold"
  };

  return (
    <Button
      variant="contained"
      sx={buttonSx}
      disabled={loading}
      onClick={onClick}
      endIcon={<SendIcon />}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: 'white', marginRight: '10px' }} />
      ) : (
        label
      )}
    </Button>
  );
};

export default ProgressButton;
