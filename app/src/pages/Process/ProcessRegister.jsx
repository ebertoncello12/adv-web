import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import {Col, Row, Table, Input, Switch, Button} from 'antd'; // Importe o componente Switch do Ant Design
import { getProcess } from "../../services/Process.js";
import styled from 'styled-components';
import moment from 'moment';
import {CardQuantityDashboard} from "../../components/dashboard/CardQuantityDashboard.jsx";

const { Search } = Input; // Importe o componente de input de busca do Ant Design

const StyledTable = styled(Table)`
  && {
    .ant-pagination-item {
      background-color: #45070D;
      border-color: #45070D;
      color: white;
    }

    .ant-pagination-item-active {
      background-color: #1d1b1b !important;
      border-color: #45070D !important;
    }
  }
`;

const ProcessRegister = () => {
    const [processData, setProcessData] = useState({ pagination: {}, items: [] });
    const [summaryFilter, setSummaryFilter] = useState('');
    const [archiveFilter, setArchiveFilter] = useState(false);

    useEffect(() => {
        fetchData();
    }, [summaryFilter, archiveFilter]);

    const fetchData = async (page) => {
        try {
            const queryParams = {
                page: page,
                pageSize: 6,
                summary: summaryFilter,
                archive: archiveFilter
            };

            const response = await getProcess(queryParams);
            setProcessData(response);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    const handleTableChange = (pagination) => {
        const { current } = pagination;
        fetchData(current);
    };

    const columns = [
        {
            title: 'Número do processo',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Autor / Réu',
            key: 'authorDefendant',
            render: (text, record) => (
                <span>{record.suitor} X {record.defendant}</span>
            ),
        },
        {
            title: 'Valor da causa',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Data da distribuição',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: createdAt => moment(createdAt).format('YYYY-MM-DD'),
        },
        {
            title: 'Arquivado',
            dataIndex: 'archive',
            key: 'archive',
            render: archive => archive ? 'Sim' : 'Não',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Registrar processo</title>
            </Helmet>
            <div style={{ margin: '0 auto', width: '80%', maxHeight: '800px', marginTop: '20px' }}>
                <button>Teste</button>
            </div>
        </>
    );
};

export default ProcessRegister;
