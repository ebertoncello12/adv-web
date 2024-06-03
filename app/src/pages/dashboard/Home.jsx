import { Helmet } from 'react-helmet';
import { CardQuantityDashboard } from '../../components/dashboard/CardQuantityDashboard';
import {useEffect, useState} from 'react';
import { Row, Col, Button } from 'antd';
import {home} from "../../services/Home.js";

const Home = () => {
  const [homeData, setHomeData] = useState({});


  useEffect(() => {

    const homeData = async () => {
      try {
        const response = await home();
        setHomeData(response);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    homeData();
  }, []);


  return (
      <>
        <Helmet>
          <title>Inicio</title>
        </Helmet>
        <div style={{ margin: '0 auto', marginTop: '50px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <CardQuantityDashboard
                  title="Processos"
                  quantity={homeData.process || 0}
              />
            </Col>
            <Col span={8}>
              <CardQuantityDashboard
                  title="Publicações"
                  quantity={homeData.notification || 0}
              />
            </Col>
            <Col span={8}>
              <CardQuantityDashboard
                  title="Compromisso em 15 dias"
                  quantity={homeData.task || 0}
              />
            </Col>
          </Row>
        </div>
      </>
  );
};

export default Home;
