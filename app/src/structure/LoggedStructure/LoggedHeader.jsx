import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, Space, Typography, Table } from 'antd';
import { useEffect, useState } from "react";
import Logo from "../../components/logo/Logo.jsx";
import { getPayload } from "../../helpers/AuthenticatorHelper.js";
import { home } from "../../services/Home.js";
import { getNotifications } from "../../services/Notification.js";

function AppHeader() {
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [userData, setUserData] = useState(null)
    const [homeData, setHomeData] = useState({})
    const [notificationData, setNotificationData] = useState({ pagination: {}, items: [] });

    const fetchData = async () => {
        const payload = await getPayload();
        setUserData(payload);
    };

    useEffect(() => {
        const fetchDataAndHome = async () => {
            try {
                const response = await home();
                setHomeData(response);
                fetchData();
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchDataAndHome();
    }, []);

    const allNotificationData = async () => {
        try {
            const queryParams = {
                read: false
            };

            const response = await getNotifications(queryParams);
            setNotificationData(response);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    return (
        <div className="AppHeader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px' }}>
            <Logo style={{ width: '100px', marginLeft: '20px' }} />

            <Space size="large">
                <Badge count={2} >
                    <MailOutlined
                        style={{ fontSize: 24, color: 'white' }}
                        onClick={() => {
                            setCommentsOpen(true);
                        }}
                    />
                </Badge>
                <Badge count={homeData.notification}>
                    <BellFilled
                        style={{ fontSize: 24, color: 'white' }}
                        onClick={() => {
                            setNotificationsOpen(true);
                            allNotificationData();
                        }}
                    />
                </Badge>

                <Space size="small">
                    <UserOutlined style={{ fontSize: 24, color: 'white' }} />
                    <div>
                        <Typography.Text style={{ color: 'white' }}>{userData?.name}</Typography.Text>
                        <Typography.Text style={{ color: 'white', display: 'block' }}>Codigo ADV: {userData?.advCode}</Typography.Text>
                    </div>
                </Space>
            </Space>

            <Drawer
                title="Comments"
                open={commentsOpen}
                onClose={() => {
                    setCommentsOpen(false);
                }}
                maskClosable
            >

            </Drawer>

            <Drawer
                title={`Publicações não lidas: ${notificationData.pagination.total}`}
                open={notificationsOpen}
                width={600}
                height={400}
                onClose={() => {
                    setNotificationsOpen(false);
                }}
                maskClosable
            >
                <Table
                    dataSource={notificationData.items}
                    rowKey="id"
                    pagination={false}

                >
                    <Table.Column title="Processo" dataIndex="processNumber" key="processNumber" />
                    <Table.Column title="Jornal" dataIndex="journal" key="journal" />
                    <Table.Column title="Caderno" dataIndex="book" key="book" />
                </Table>
            </Drawer>
        </div>
    );
}

export default AppHeader;
