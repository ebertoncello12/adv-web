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
  Box,
} from '@mui/material';

const ModalDialogRaw = (props) => {
  const { onClose, children, title, open, ...other } = props;

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
        <>{children}</>
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 1 }}>
          <Button
            autoFocus
            color="error"
            variant="contained"
            size="large"
            onClick={handleCancel}
            sx={{ ml: 1, mr: 1 }}
            startIcon={<IconCancel />}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            size="large"
            onClick={handleOk}
            sx={{ mr: 1 }}
            startIcon={<IconCheck />}
          >
            Ok
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

ModalDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalDialogRaw;
