import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Button } from 'antd';
import { getUserDetails, updatePersonDetails } from "../../services/Person.js";
import InputMask from "react-input-mask";
import {UserOutlined} from "@ant-design/icons";

const { Title } = Typography;

const PersonDetails = () => {
    const [userData, setUserData] = useState({});
    const [formValues, setFormValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserDetails();
                setUserData(response);
                setFormValues(response);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleUpdateClick = async () => {
        try {
            setIsLoading(true);

            const requestBody = {
                email: formValues.email,
                mobile: formValues.mobile
            };

            await updatePersonDetails(requestBody);
            setUserData({
                ...userData,
                email: formValues.email,
                mobile: formValues.mobile
            });
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Helmet>
                <title>Informações Pessoais</title>
            </Helmet>
            <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginTop: '50px', width: '500px' }}>
                <Row justify="center">
                    <Col>
                        <Title level={2} style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Detalhes Pessoais</Title>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Nome:</Title>
                        <Input name="name" value={formValues.name} onChange={handleInputChange} disabled />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Documento:</Title>
                        <InputMask
                            mask="999.999.999-99"
                            maskChar=""
                            disabled
                            value={formValues.document}
                        >
                            {() => <Input prefix={<UserOutlined />} placeholder="CPF" disabled />}
                        </InputMask>
                    </Col>


                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Data de Nascimento:</Title>
                        <Input name="dateOfBirth" value={formValues.dateOfBirth} onChange={handleInputChange} disabled />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div style={{ marginBottom: '20px' }}>
                            <Title level={3} style={{ color: '#333' }}>Dados de Contato</Title>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>E-mail:</Title>
                        <Input name="email" value={formValues.email} onChange={handleInputChange} />
                    </Col>
                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Telefone:</Title>
                        <Input name="mobile" value={formValues.mobile} onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Número da OAB:</Title>
                        <Input name="oabNumber" value={formValues.oab?.number} onChange={handleInputChange} disabled />
                    </Col>
                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Localização da OAB:</Title>
                        <Input name="oabLocation" value={formValues.oab?.location} onChange={handleInputChange} disabled />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#333' }}>Código Advogado:</Title>
                        <Input name="advCode" value={formValues.advCode} onChange={handleInputChange} disabled />
                    </Col>
                </Row>
                <Row justify="end" style={{ marginTop: '30px' }}>
                    <Col>
                        <Button type="primary" loading={isLoading} onClick={handleUpdateClick} style={{ width: '200px', backgroundColor: '#45070D' }}>
                            Atualizar
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default PersonDetails;
