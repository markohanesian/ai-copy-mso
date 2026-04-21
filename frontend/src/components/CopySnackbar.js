import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CopySnackbar = ({ open, onClose, message, severity = 'success' }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert 
                onClose={onClose} 
                severity={severity} 
                variant="filled" 
                sx={{ 
                    width: '100%', 
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CopySnackbar;
