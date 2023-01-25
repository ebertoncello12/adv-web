import React from 'react';
import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

export const ScreenListToolbar = (props) => {
  const navigate = useNavigate();

  const goAddRegister = () => navigate(props.goAddRegisterPath || '#');

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
        {props && props.goAddRegisterPath && (
          <Box sx={{ p: 2, m: 1 }}>
            <Button
              title="Adicionar"
              startIcon={<AddIcon fontSize="medium" />}
              color="primary"
              variant="contained"
              onClick={goAddRegister}
              style={{ marginLeft: '15px' }}
            >
              ADICIONAR
            </Button>
          </Box>
        )}
      </Box>
      <Divider sx={{ ml: 2, mr: 2 }} />
      <Box>
        <Card>
          <CardContent>
            <Box>
              <>{props.children}</>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

ScreenListToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  goAddRegisterPath: PropTypes.string,
};
