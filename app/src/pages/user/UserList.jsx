import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Fab,
  FormControl,
  InputAdornment,
  SvgIcon,
  Switch,
  TableCell,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { ScreenListToolbar } from '../../components/toolbar/ScreenListToolbar';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { Search } from '@mui/icons-material';
import {
  deleteUser,
  getAllUser,
  userDisable,
  userEnable,
} from '../../services/UserService';
import { getProfile } from '../../services/ProfileService';
import LockResetIcon from '@mui/icons-material/LockReset';
import ModalDialog from '../../components/dialogs/ModalDialog';
import { recoverPassword } from '../../services/AuthenticatorService';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const columns = [
  { id: 'nome', label: 'NOME', minWidth: 200 },
  { id: 'email', label: 'EMAIL', minWidth: 150 },
  { id: 'perfil', label: 'PERFIL DE ACESSO', minWidth: 100 },
  {
    id: 'dataCriacao',
    label: 'DATA CRIAÇÃO',
    minWidth: 100,
    align: 'right',
    format: (value) =>
      value && value.length > 0 ? moment(value).format('DD/MM/YYYY HH:mm:ss') : '',
  },
  { id: 'status', align: 'center', label: 'ATIVO' },
  {
    id: 'actions',
    align: 'right',
    minWidth: 130,
    disablePadding: false,
    label: 'AÇÕES',
  },
];

const UserList = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [querySearch, setQuerySearch] = useState({
    pagina: 0,
    tamanhoPagina: 5,
    nome: null,
    perfil: null,
    ativo: state === null ? null : state.status,
  });
  const [rows, setRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perfilList, setPerfilList] = useState([]);
  const [statusList, setStatusList] = useState([
    {
      value: null,
      text: '',
    },
    {
      value: 'true',
      text: 'Sim',
    },
    {
      value: 'false',
      text: 'Não',
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [messageDescription, setMessageDescription] = useState('');
  const [email, setEmail] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [messageDescriptionRemove, setMessageDescriptionRemove] = useState('');

  const builderData = (responseUser) => {
    setRows(responseUser?.itens || []);
    setTotalRecords(responseUser?.paginacao?.total || 0);
  };

  const searchUser = async () => {
    const _querySearch = { ...querySearch, pagina: 0 };
    setQuerySearch(_querySearch);
    const responseUser = await dispatch(getAllUser(_querySearch));
    builderData(responseUser);
  };

  const handleChangePage = async (event, newPage) => {
    const _querySearch = { ...querySearch, pagina: newPage };
    setQuerySearch(_querySearch);
    const responseUser = await dispatch(getAllUser(_querySearch));
    builderData(responseUser);
  };

  const handleChangeRowsPerPage = async (event) => {
    const _querySearch = {
      ...querySearch,
      pagina: 0,
      tamanhoPagina: +event.target.value,
    };
    setQuerySearch(_querySearch);
    const responseUser = await dispatch(getAllUser(_querySearch));
    builderData(responseUser);
  };

  const handleChangeEnableDisableUser = async (event, row) => {
    const checked = event.target.checked;
    let result;
    if (checked) {
      result = await dispatch(userEnable(row.id));
    }

    if (!checked) {
      result = await dispatch(userDisable(row.id));
    }

    if (!result) {
      return;
    }

    const updateRows = [...rows];
    row[event.target.name] = checked;
    updateRows[row] = row;
    setRows(updateRows);
  };

  const checkMyKey = async (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      event.preventDefault();
      await searchUser();
    }
  };

  const handleOpenModal = ({ nome, email, id }) => {
    setEmail(email);
    setOpenModal(true);
    setMessageDescription(
      `Deseja recuperar senha do ${nome}? Se sim enviaremos o codigo de acesso nesse email (${email}).`
    );
  };

  const handleSendAccessData = async () => {
    await dispatch(recoverPassword({ usuario: email }));
    setOpenModal(false);
  };

  const handleOpenModalDelete = ({ nome, id }) => {
    setIdUser(id);
    setOpenModalDelete(true);
    setMessageDescriptionRemove(`Tem certeza que deseja remover ${nome}?`);
  };

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(idUser));
    setOpenModalDelete(false);
    await searchUser();
  };

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (state) {
        const _querySearch = { ...querySearch, ativo: state.status };
        setQuerySearch(_querySearch);
      }
      await searchUser();

      const responseProfile = await dispatch(getProfile());
      if (responseProfile && responseProfile.length > 0) {
        setPerfilList([{ id: '', nome: '' }, ...responseProfile]);
      }
    };

    if (!isLoadData && rows.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
    return () => {
      builderData(null);
    };
  }, [isLoadData]);

  return (
    <>
      <Helmet>
        <title>Lista de Usuários</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenListToolbar
            title="Lista de Usuários"
            goAddRegisterPath="/usuario/adicionar"
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1,
              }}
            >
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '35ch', p: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl fullWidth sx={{ p: 1 }}>
                  <TextField
                    label="Buscar nome do usuário"
                    fullWidth
                    onKeyDown={(e) => checkMyKey(e)}
                    onChange={(e) =>
                      setQuerySearch({ ...querySearch, nome: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Buscar nome do usuário"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                  <TextField
                    fullWidth
                    label="Perfil"
                    name="perfil"
                    select
                    onKeyDown={(e) => checkMyKey(e)}
                    onChange={(e) =>
                      setQuerySearch({ ...querySearch, perfil: e.target.value })
                    }
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
                <FormControl fullWidth sx={{ p: 1 }}>
                  <TextField
                    fullWidth
                    label="Ativo"
                    name="ativo"
                    select
                    defaultValue={state ? state.status : ''}
                    onKeyDown={(e) => checkMyKey(e)}
                    onChange={(e) => {
                      setQuerySearch({
                        ...querySearch,
                        ativo: e.target.value !== '' ? e.target.value : null,
                      });
                    }}
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    {statusList.map((el) => (
                      <option key={el.value} value={el.value}>
                        {el.text}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
              </Box>
              <Box sx={{ p: 1, m: 1 }}>
                <Button
                  fullWidth
                  title="Pesquisar"
                  startIcon={<Search fontSize="medium" />}
                  color="primary"
                  variant="contained"
                  onClick={searchUser}
                >
                  PESQUISAR
                </Button>
              </Box>
            </Box>
          </ScreenListToolbar>
          <PerfectScrollbar>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 1, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === 'perfil') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value.nome}
                              </TableCell>
                            );
                          }
                          if (typeof value === 'boolean') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Switch
                                  checked={row[column.id]}
                                  onChange={(e) =>
                                    handleChangeEnableDisableUser(e, row)
                                  }
                                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  name={column.id}
                                />
                              </TableCell>
                            );
                          }
                          if (column.id === 'actions') {
                            return (
                              <TableCell key={column.id} align="right">
                                <Tooltip
                                  title="Reenviar dados de acesso"
                                  sx={{
                                    marginRight: 1,
                                    marginBottom: 0.3,
                                    marginTop: 0.3,
                                    padding: 2,
                                  }}
                                >
                                  <Fab
                                    color="default"
                                    size="small"
                                    onClick={() => handleOpenModal(row)}
                                  >
                                    <LockResetIcon />
                                  </Fab>
                                </Tooltip>
                                <Link
                                  to={`/usuario/editar/${row.id}`}
                                  state={{ user: row }}
                                >
                                  <Tooltip
                                    title="Editar"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab color="default" size="small">
                                      <EditIcon />
                                    </Fab>
                                  </Tooltip>
                                </Link>
                                <Tooltip
                                  title="Excluir"
                                  sx={{
                                    marginRight: 1,
                                    marginBottom: 0.3,
                                    marginTop: 0.3,
                                    padding: 2,
                                  }}
                                >
                                  <Fab
                                    color="default"
                                    size="small"
                                    onClick={() => handleOpenModalDelete(row)}
                                  >
                                    <DeleteIcon />
                                  </Fab>
                                </Tooltip>
                              </TableCell>
                            );
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={totalRecords}
              rowsPerPage={querySearch.tamanhoPagina}
              page={querySearch.pagina}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
              }}
              labelRowsPerPage="Registro por página:"
            />
            <ModalDialog
              title="Reenviar dados de acesso"
              open={openModal}
              onClose={() => setOpenModal(false)}
            >
              <Typography gutterBottom align="center">
                {messageDescription}
              </Typography>
              {messageDescription.includes('sem') ? null : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px',
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ padding: '10px 30px', width: '200px' }}
                    onClick={() => handleSendAccessData()}
                  >
                    SIM
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ padding: '10px 30px', width: '200px' }}
                    onClick={() => setOpenModal(false)}
                  >
                    NÃO
                  </Button>
                </Box>
              )}
            </ModalDialog>
            <ModalDialog
              title="Excluir Usuario"
              open={openModalDelete}
              onClose={() => setOpenModalDelete(false)}
            >
              <Typography gutterBottom align="center">
                {messageDescriptionRemove}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '20px',
                }}
              >
                <Button
                  variant="contained"
                  style={{ padding: '10px 30px', width: '200px' }}
                  onClick={() => handleDeleteUser()}
                >
                  SIM
                </Button>
                <Button
                  variant="outlined"
                  style={{ padding: '10px 30px', width: '200px' }}
                  onClick={() => setOpenModalDelete(false)}
                >
                  NÃO
                </Button>
              </Box>
            </ModalDialog>
          </PerfectScrollbar>
        </Paper>
      </Container>
    </>
  );
};

export default UserList;
