import { Typography, Space } from "antd";
import { InstagramOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';

function AppFooter() {
    return (
        <div className="AppFooter">
            <div style={{ marginBottom: '1rem' }}>
                <Space size="middle">
                    <InstagramOutlined />
                    <FacebookOutlined />
                    <LinkedinOutlined />
                </Space>
            </div>
            <Typography.Text>
                Copyright © 2024 | BHUT SERVIÇOS DE TECNOLOGIA LTDA | 33.513.012/0001-79
            </Typography.Text>
            <br />

        </div>
    );
}

export default AppFooter;
