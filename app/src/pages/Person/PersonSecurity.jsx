import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import {Row, Col, Typography, Input, Button, Form, message, Modal} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title } = Typography;

const PersonSecurity = () => {
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');
    const [isDeleteModalOkEnabled, setIsDeleteModalOkEnabled] = useState(false);


    const onFinish = (values) => {

    };

    const onDeleteAccount = (reason) => {

        console.log("Excluir conta com motivo:", reason);

    }


    const handleDeleteConfirm = () => {
        onDeleteAccount(deleteReason);
        setDeleteModalVisible(false);
    }

    const handleReasonChange = (e) => {
        const reason = e.target.value;
        setDeleteReason(reason);
        setIsDeleteModalOkEnabled(!!reason.trim());
    }

    return (
        <>
            <Helmet>
                <title>Trocar Senha</title>
            </Helmet>
            <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginTop: '50px', width: '500px' }}>
                <Row justify="center">
                    <Col>
                        <Title level={2} style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Trocar Senha</Title>
                    </Col>
                </Row>
                <Form form={form} onFinish={onFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="currentPassword"
                                label="Senha Atual"
                                rules={[
                                    { required: true, message: 'Por favor, insira sua senha atual.' },
                                    { min: 6, message: 'A senha atual deve ter no mínimo 6 caracteres.' }
                                ]}
                            >
                                <Input.Password
                                    prefix={<EyeInvisibleOutlined />}
                                    placeholder="Senha Atual"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="newPassword"
                                label="Nova Senha"
                                rules={[
                                    { required: true, message: 'Por favor, insira sua nova senha.' },
                                    { min: 6, message: 'A nova senha deve ter no mínimo 6 caracteres.' }
                                ]}
                            >
                                <Input.Password
                                    prefix={<EyeInvisibleOutlined />}
                                    placeholder="Nova Senha"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirme a Senha"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Por favor, confirme sua nova senha.' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('As senhas não coincidem.'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<EyeInvisibleOutlined />}
                                    placeholder="Confirme a Senha"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: '30px' }}>
                        <Col>
                            <Button type="primary" htmlType="submit"  style={{ width: '200px', backgroundColor: '#45070D' }}>
                                Atualizar
                            </Button>
                        </Col>
                        <Col>
                            <Button type="primary" style={{ width: '200px', backgroundColor: '#45070D' }} onClick={() => setDeleteModalVisible(true)}>
                                Excluir conta
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </div>

            <Modal
                title="Motivo para excluir conta"
                visible={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onOk={handleDeleteConfirm}
                okButtonProps={{ disabled: !isDeleteModalOkEnabled, style: { backgroundColor: '#45070D' } }}
            >
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontWeight: 'bold' }}>A exclusão da conta é permanente.</p>
                    <p style={{ fontWeight: 'bold' }}>Seu perfil, agenda, processos e publicações serão excluídos permanentemente.</p>
                </div>
                <Input.TextArea
                    rows={4}
                    value={deleteReason}
                    onChange={handleReasonChange}
                    placeholder="Digite o motivo para excluir sua conta..."
                />
            </Modal>
        </>
    );
};

export default PersonSecurity;
