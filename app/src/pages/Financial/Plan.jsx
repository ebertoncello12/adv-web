import { Helmet } from 'react-helmet';
import { CardQuantityDashboard } from '../../components/dashboard/CardQuantityDashboard';
import {useEffect, useState} from 'react';
import { Row, Col, Button } from 'antd';
import {home} from "../../services/Home.js";

const Plan = () => {
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
                <title>Escolher plano</title>
            </Helmet>
            <div style={{ margin: '0 auto', marginTop: '50px' }}>

            </div>
        </>
    );
};

export default Plan;
