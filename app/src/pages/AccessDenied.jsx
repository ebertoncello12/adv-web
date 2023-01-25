import { Helmet } from 'react-helmet';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useNavigate } from 'react-router';

const AccessDenied = () => {
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
  };
  return (
    <>
      <Helmet>
        <title>403</title>
      </Helmet>
      <Box
        style={{
          width: '95%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          title="Voltar"
          startIcon={<ArrowBackIcon fontSize="medium" />}
          color="primary"
          variant="contained"
          onClick={() => {
            navigateTo('/dashboard');
          }}
        >
          VOLTAR
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth="md"
          style={{
            flexWrap: 'wrap',
            m: -1,
            justifyContent: 'center',
          }}
        >
          <Typography align="center" color="textPrimary" variant="h1">
            403: Acesso Negado
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Você tentou acessar uma página que não pode ou veio aqui por engano. Por
            favor, tente usar a navegação lateral.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/static/images/403.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AccessDenied;
