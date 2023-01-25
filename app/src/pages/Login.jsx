import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from '../services/AuthenticatorService';
import React from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(signIn(values, navigate));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ mt: '20%', p: 5, textAlign: 'center' }}>
            <Formik
              initialValues={{
                login: '',
                senha: '',
              }}
              validationSchema={Yup.object().shape({
                login: Yup.string().required('Login inválido'),
                senha: Yup.string()
                  .required('Senha é obrigatório')
                  .required('Senha inválido'),
              })}
              onSubmit={async (values) => {
                await onSubmit(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ textAlign: 'left', mb: 1 }}>
                    <Typography color="textPrimary" variant="h5">
                      Login
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    error={Boolean(touched.login && errors.login)}
                    fullWidth
                    helperText={touched.login && errors.login}
                    label="Usuário"
                    margin="normal"
                    name="login"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.login}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.senha && errors.senha)}
                    fullWidth
                    helperText={touched.senha && errors.senha}
                    label="Senha"
                    margin="normal"
                    name="senha"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.senha}
                    variant="outlined"
                    color={'info'}
                  />
                  <Box sx={{ py: 1, textAlign: 'right' }}>
                    <Typography color="textSecondary" variant="body1">
                      <Link to="/recuperar/senha" variant="h6">
                        Esqueci minha senha
                      </Link>
                    </Typography>
                  </Box>
                  <Box sx={{ py: 1, textAlign: 'center' }}>
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, width: '150px' }}
                      title="Login"
                      startIcon={<LoginIcon titleAccess="Login" />}
                    >
                      Login
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
