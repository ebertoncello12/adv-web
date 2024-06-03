import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

}));

const LoadingCircularProgress = () => {
  const classes = useStyles();
  const { open } = useSelector((state) => state.loading);

  return (
      <>
        <Backdrop title="Loading..."  open={open}>
          <CircularProgress size={75} color="inherit" />
        </Backdrop>
      </>
  );
};

export default LoadingCircularProgress;
