import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';

export const ScreenCrudToolbar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ p: 2, m: 1 }} variant="h4">
          {props.title || 'Titulo Tela'}
        </Typography>
        {props && props.showButtonGoback && props.showButtonGoback === true && (
          <Box sx={{ p: 2, m: 1 }}>
            <Button
              title="Voltar"
              startIcon={<ArrowBackIcon fontSize="medium" />}
              color="primary"
              variant="contained"
              onClick={() => navigate(-1)}
            >
              VOLTAR
            </Button>
          </Box>
        )}
      </Box>
      <Divider sx={{ ml: 2, mr: 2 }} />
    </>
  );
};

ScreenCrudToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  showButtonGoback: PropTypes.bool,
};
