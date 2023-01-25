import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import { CardQuantityDashboard } from '../../components/dashboard/CardQuantityDashboard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDashboard } from '../../services/DashboardService';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dasboardData, setDashboardData] = useState({
    usuariosTotal: 0,
    usuariosAtivos: 0,
    usuariosInativos: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isLoadData, setLoadData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const responseDashboard = await dispatch(getDashboard());
      if (responseDashboard) {
        setDashboardData(responseDashboard);
      }
    };

    if (!isLoadData) {
      setLoadData(true);
      fetchData().then();
    }

    return () => {
      setLoading(false);
    };
  });

  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <>
            <CardQuantityDashboard
              loading={loading.toString()}
              title="Usuários"
              quantity={dasboardData?.usuariosTotal || 0}
              onClick={() => {
                navigateTo('/usuario', { status: null });
              }}
            />
            <CardQuantityDashboard
              loading={loading.toString()}
              title="Usuários ativos"
              quantity={dasboardData?.usuariosAtivos || 0}
              onClick={() => {
                navigateTo('/usuario', { status: 'true' });
              }}
            />
            <CardQuantityDashboard
              loading={loading.toString()}
              title="Usuários inátivos"
              quantity={dasboardData?.usuariosInativos || 0}
              onClick={() => {
                navigateTo('/usuario', { status: 'false' });
              }}
            />
          </>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
