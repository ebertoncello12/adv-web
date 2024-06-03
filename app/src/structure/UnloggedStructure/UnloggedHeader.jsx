import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space, Typography } from 'antd';
import { useEffect, useState } from "react";
import Logo from "../../components/logo/Logo.jsx";
import {removeUserAuth} from "../../storage/AuthenticatorStorage.js";

function UnloggedHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div className="AppHeader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px' }}>
            <Logo style={{ width: '100px', marginLeft: '20px' }} />

            <Drawer
                title="Comments"
                open={commentsOpen}
                onClose={() => {
                    setCommentsOpen(false);
                }}
                maskClosable
            >
                <List
                    dataSource={comments}
                    renderItem={(item) => {
                        return <List.Item>{item.body}</List.Item>;
                    }}
                />
            </Drawer>

            <Drawer
                title="Notifications"
                open={notificationsOpen}
                onClose={() => {
                    setNotificationsOpen(false);
                }}
                maskClosable
            >
                <List
                    dataSource={orders}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Text strong>{item.title}</Typography.Text> has been ordered!
                            </List.Item>
                        );
                    }}
                />
            </Drawer>
        </div>
    );
}

export default UnloggedHeader;
