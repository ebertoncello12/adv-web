import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import { ScreenCrudToolbar } from '../../components/toolbar/ScreenCrudToolbar';
import SaveIcon from '@mui/icons-material/Save';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProfile } from '../../services/ProfileService';
import { changeProfile } from '../../services/UserService';

const UserEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const user = state.user;
  const [perfilList, setPerfilList] = useState([]);

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      perfil: '',
    },
    onSubmit: (values) => {},
  });
  const [perfil, setPerfil] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const onReload = async () => {
      if (!isLoaded) {
        setIsLoaded(true);
        await getProfileList();
        await fetchData();
      }
    };

    const fetchData = async () => {
      if (user) {
        await formik.setFieldValue('nome', user.nome);
        await formik.setFieldValue('email', user.email);
        setPerfil(user.perfil.id);
      }
    };

    const getProfileList = async () => {
      const response = await dispatch(getProfile());
      setPerfilList(response);
    };

    onReload();
  }, []);

  const submitUpdateUser = async () => {
    await formik.submitForm();
    if (perfil) {
      await dispatch(changeProfile(user.id, { perfil }, navigate));
    }
  };

  return (
    <>
      <Helmet>
        <title>Alterar Usuário</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title="Alterar Usuário" showButtonGoback={true} />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="Nome"
                          placeholder="Nome"
                          type="text"
                          name="nome"
                          disabled
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.nome}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="Email"
                          placeholder="Email"
                          type="text"
                          name="email"
                          disabled
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          variant="outlined"
                          autoComplete="off"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          label="Perfil"
                          name="perfil"
                          select
                          value={perfil}
                          onChange={(e) => setPerfil(e.target.value)}
                          SelectProps={{ native: true }}
                          variant="outlined"
                        >
                          {perfilList.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.nome}
                            </option>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon fontSize="large" />}
                    sx={{ width: 150 }}
                    onClick={submitUpdateUser}
                    title="Alterar"
                  >
                    ALTERAR
                  </Button>
                </Box>
              </Card>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UserEdit;
