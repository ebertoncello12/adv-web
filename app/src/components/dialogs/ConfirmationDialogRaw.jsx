import React from 'react';
import PropTypes from 'prop-types';
import IconCancel from '@mui/icons-material/Close';
import IconCheck from '@mui/icons-material/Check';

import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const ConfirmationDialog = (props) => {
  const { onClose, message, title, open, ...other } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog disableEscapeKeyDown maxWidth="xs" open={open} {...other}>
      <DialogTitle style={{ cursor: 'move' }} color="secondary">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="error"
          variant="contained"
          size="large"
          onClick={handleCancel}
          startIcon={<IconCancel />}
        >
          Cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          size="large"
          onClick={handleOk}
          startIcon={<IconCheck />}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
