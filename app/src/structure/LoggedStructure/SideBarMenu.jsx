import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {removeUserAuth} from "../../storage/AuthenticatorStorage.js";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const handleLogout = async () => {
    await removeUserAuth();
  };

  const menuItems = [
    {
      label: "Início",
      icon: <AppstoreOutlined />,
      key: "/home",
    },
    {
      label: "Agenda",
      key: "/agenda",
      icon: <ShopOutlined />,
    },
    {
      label: "Processos",
      key: "/processos",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: "Publicações",
      key: "/publicacoes",
      icon: <UserOutlined />,
    },
    {
      label: "Mais",
      key: "submenu",
      icon: <UserOutlined />,
      children: [
        {
          label: "Informações Pessoais",
          key: "/informacoes-pessoais",
        },
        {
          label: "Segurança",
          key: "/seguranca",
        },
        {
          label: "Financeiro",
          key: "/financeiro",
        },
        {
          label: "Termo de uso / Privacidade",
          key: "/",
          onClick: () => window.location.href = 'https://www.advnote.com.br/politica.html',

        },
        {
          label: "Sair",
          key: "/login",
          onClick: handleLogout,
        },
      ],
    },
  ];

  return (
      <div className="SideMenu">
        <Menu
            className="SideMenuVertical"
            mode="vertical"
            onClick={({ key }) => navigate(key)}
            selectedKeys={[selectedKeys]}
            items={menuItems}
        ></Menu>
      </div>
  );
}

export default SideMenu;
