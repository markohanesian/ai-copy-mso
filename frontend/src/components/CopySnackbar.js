import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CopySnackbar = ({ open, onClose, message }) => {
    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000} // Duration for how long the snackbar will show
            onClose={onClose}
            message={message}
            action={action}
        />
    );
};

export default CopySnackbar;
