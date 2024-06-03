import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import {
    Col,
    Row,
    Table,
    Button,
    Modal,
    Form,
    Input as AntdInput,
    DatePicker,
} from 'antd';
import { getProcess, registerProcess } from '../../services/Process.js';
import styled from 'styled-components';
import moment from 'moment';
import InputMask from 'react-input-mask';
import {getPaymentHistory, getPlan} from "../../services/Financial.js";
import {useNavigate} from "react-router";

const { RangePicker } = DatePicker;
const StyledTable = styled(Table)`
  && {
    .ant-pagination-item {
      background-color: #45070d;
      border-color: #45070d;
      color: white;
    }

    .ant-pagination-item-active {
      background-color: #1d1b1b !important;
      border-color: #45070d !important;
    }
  }
`;

const Financial = () => {
    const [historyData, setPaymentHistoryData] = useState({ pagination: {}, items: [] });
    const [planData, setPlanData] = useState({});
    const [dateRange, setDateRange] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
        fetchPlanData()
    }, [dateRange]);

    const fetchData = async (page = 1) => {
        try {
            const [dateStart, dateEnd] = dateRange;
            const queryParams = {
                page,
                pageSize: 6,
                ...(dateStart && { dateStart: dateStart.format('YYYY-MM-DD') }),
                ...(dateEnd && { dateEnd: dateEnd.format('YYYY-MM-DD') }),
            };
            const response = await getPaymentHistory(queryParams);
            setPaymentHistoryData(response);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    const fetchPlanData = async () => {
        try {
            const response = await getPlan();
            setPlanData(response);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    const handleTableChange = (pagination) => {
        const { current } = pagination;
        fetchData(current);
    };

    const handleChoosePlan = () => {
        navigate('/escolher-plano');
    };


    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    const handleFormSubmit = async (values) => {
        try {
            await registerProcess(values);
            form.resetFields();
            fetchData();
        } catch (error) {
            console.error('Erro ao cadastrar processo:', error);
        }
    };

    const columns = [
        {
            title: 'Plano',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Período',
            dataIndex: ['periodInit', 'periodEnd'],
            key: 'period',
            render: (text, record) => {
                const { periodInit, periodEnd } = record;
                return `${moment(periodInit).format('DD/MM/YYYY')} - ${moment(periodEnd).format('DD/MM/YYYY')}`;
            },
        },
        {
            title: 'Pago',
            dataIndex: 'paid',
            key: 'paid',
            render: (paid) => (paid ? 'Sim' : 'Não'),
        },
        {
            title: 'Método de pagamento',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Valor',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(amount),
        },
    ];



    return (
        <>
            <Helmet>
                <title>Financeiro</title>
            </Helmet>
            <div
                style={{
                    margin: '0 auto',
                    width: '80%',
                    maxHeight: '800px',
                    marginTop: '20px',
                }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <h5>Histórico de Pagamentos</h5>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <div style={{ marginBottom: 16 }}>
                            <h3 style={{ marginBottom: 8 }}>Plano Atual:</h3>
                            {planData && (
                                <div>
                                    <strong>{planData.name}</strong>: {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(planData.value)}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col span={12}>
                        <RangePicker
                            style={{ marginBottom: 16, width: '100%' }}
                            onChange={handleDateChange}
                        />
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button
                            type="primary"
                            onClick={handleChoosePlan}
                            style={{ backgroundColor: '#45070D' }}
                        >
                            Escolher outro plano
                        </Button>
                    </Col>
                </Row>

                <StyledTable
                    columns={columns}
                    dataSource={historyData.items}
                    pagination={{
                        ...historyData.pagination,
                        itemRender: (current, type, originalElement) => {
                            if (
                                type === 'prev' ||
                                type === 'next' ||
                                type === 'jump-prev' ||
                                type === 'jump-next'
                            ) {
                                return originalElement;
                            }
                            return <span>{current}</span>;
                        },
                        showSizeChanger: false,
                    }}
                    onChange={handleTableChange}
                    rowKey="id"
                    style={{ width: '100%' }}
                />
            </div>
        </>
    );
};

export default Financial;
