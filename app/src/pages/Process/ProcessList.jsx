import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Table,
  Input,
  Switch,
  Button,
  Modal,
  Form,
  Input as AntdInput,
  InputNumber,
  DatePicker,
} from 'antd';
import {getProcess, registerProcess} from '../../services/Process.js';
import styled from 'styled-components';
import moment from 'moment';
import InputMask from 'react-input-mask';

const { Search } = Input;
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

const ProcessList = () => {
  const [processData, setProcessData] = useState({ pagination: {}, items: [] });
  const [summaryFilter, setSummaryFilter] = useState('');
  const [archiveFilter, setArchiveFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [summaryFilter, archiveFilter]);

  const fetchData = async (page) => {
    try {
      const queryParams = {
        page: page,
        pageSize: 6,
        summary: summaryFilter,
        archive: archiveFilter,
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

  const handleAddProcess = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      const transformedData = {
        number: values.number,
        judicialSphere: values.judicialSphere,
        locale: values.locale,
        client: values.client,
        suitor: values.suitor,
        defendant: values.defendant,
        distributionDate: values.distributionDate.format('YYYY-MM-DD'),
        counterpart: {
          name: values.name,
          contact: values.contact,
        },
        amount: values.amount,
      };
      console.log(transformedData);
      await registerProcess(transformedData);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao adicionar processo:', error);
    }
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
        <span>
          {record.suitor} X {record.defendant}
        </span>
      ),
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
    {
      title: 'Data da distribuição',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD-MM-YYYY'),
    },
    {
      title: 'Arquivado',
      dataIndex: 'archive',
      key: 'archive',
      render: (archive) => (archive ? 'Sim' : 'Não'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Processos</title>
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
          <Col span={12}>
            <Search
              placeholder="Filtrar por resumo"
              allowClear
              onSearch={(value) => setSummaryFilter(value)}
              style={{ marginBottom: 16 }}
            />
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <span>Filtrar arquivados sim ou não:</span>
            <Switch
              checked={archiveFilter}
              onChange={(checked) => setArchiveFilter(checked)}
              style={{ marginLeft: 8 }}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'left', marginBottom: '10px' }}>
            <Button
              type="primary"
              onClick={handleAddProcess}
              style={{ backgroundColor: '#45070D' }}
            >
              Adicionar novo Processo
            </Button>
          </Col>
          <Modal
            title="Adicionar seu processo"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="number"
                label="Número do processo"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o número do processo!',
                  },
                ]}
              >
                <InputMask mask="9999999-99.9999.9.99.9999" maskChar="">
                  {() => <Input placeholder="Processo n:" />}
                </InputMask>
              </Form.Item>
              <Form.Item
                name="judicialSphere"
                label="Esfera judicial"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a esfera judicial!',
                  },
                ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                name="locale"
                label="Vara"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a vara!',
                  },
                ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                name="client"
                label="Cliente"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o nome do cliente!',
                  },
                ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                name="suitor"
                label="Parte Contrária (Réu)"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o nome da parte contrária (réu)!',
                  },
                ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                  name="defendant"
                  label="Réu"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, insira o nome da réu!',
                    },
                  ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                name="distributionDate"
                label="Data da Distribuição"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a data de distribuição!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                  name="amount"
                  label="Valor da Causa"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, insira o valor da causa!',
                    },
                  ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                name="name"
                label="Advogado da Parte Contrária"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o advogado da parte contrária!',
                  },
                ]}
              >
                <AntdInput />
              </Form.Item>
              <Form.Item
                name="contact"
                label="Contrato da Parte Contrária"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o contrato da parte contrária!',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: '#45070D' }}
                >
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <StyledTable
            columns={columns}
            dataSource={processData.items}
            pagination={{
              ...processData.pagination,
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
        </Row>
      </div>
    </>
  );
};

export default ProcessList;
