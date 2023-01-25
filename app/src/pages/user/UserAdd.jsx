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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../../services/UserService';
import { getProfile } from '../../services/ProfileService';

const UserAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [perfilList, setPerfilList] = useState([]);

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      perfil: '',
    },
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      perfil: Yup.string().required('Perfil é obrigatório'),
    }),
    onSubmit: async (values) => {
      const data = {
        nome: values.nome,
        email: values.email,
        login: values.email,
        perfil: values.perfil,
      };
      await dispatch(addUser(data, navigate));
    },
  });

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseProfile = await dispatch(getProfile());
      if (responseProfile && responseProfile.length > 0) {
        setPerfilList([{ id: '', nome: '' }, ...responseProfile]);
      }
    };

    if (!isLoadData && perfilList.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
  });

  return (
    <>
      <Helmet>
        <title>Adicionar Usuário</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title="Adicionar Usuário" showButtonGoback={true} />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.nome && formik.errors.nome)}
                          fullWidth
                          helperText={formik.touched.nome && formik.errors.nome}
                          label="Nome"
                          placeholder="Nome"
                          type="text"
                          name="nome"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.nome}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.email && formik.errors.email
                          )}
                          fullWidth
                          helperText={formik.touched.email && formik.errors.email}
                          label="Email"
                          placeholder="Email"
                          type="email"
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.perfil && formik.errors.perfil
                          )}
                          fullWidth
                          helperText={formik.touched.perfil && formik.errors.perfil}
                          label="Perfil"
                          placeholder="Perfil"
                          name="perfil"
                          select
                          SelectProps={{ native: true }}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.perfil}
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
                    title="Cadastrar"
                  >
                    CADASTRAR
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

export default UserAdd;
