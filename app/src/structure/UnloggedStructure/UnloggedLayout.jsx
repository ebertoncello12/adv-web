import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import UnloggedHeader from "./UnloggedHeader.jsx";
import './UnloggedLayout.css';

const { Content } = Layout;

const UnloggedLayout = () => (
    <Layout className="unloggedLayoutRoot">
      <UnloggedHeader />
      <Layout className="unloggedLayoutWrapper">
        <Content className="unloggedLayoutContent">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
);

export default UnloggedLayout;
