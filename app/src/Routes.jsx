import { Navigate } from 'react-router-dom';
import { DashboardLayout } from './layout/DashboardLayout';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/dashboard/Dashboard';
import UserList from './pages/user/UserList';
import RecoverPassword from './pages/RecoverPassword';
import { SetVerifyPassword } from './pages/SetVerifyPassword';
import UserAdd from './pages/user/UserAdd';
import UserEdit from './pages/user/UserEdit';
import { UserChangePassword } from './pages/user/UserChangePassword';
import AccessDenied from './pages/AccessDenied';

const routes = (currentUser) => {
  return [
    {
      element:
        currentUser && currentUser.accessToken ? (
          <DashboardLayout />
        ) : (
          <Navigate to="/login" />
        ),
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/usuario',
          element: <UserList />,
        },
        {
          path: '/usuario/editar/:id',
          element: <UserEdit />,
        },
        {
          path: '/usuario/adicionar',
          element: <UserAdd />,
        },
        {
          path: '/trocar-senha',
          element: <UserChangePassword />,
        },
        { path: '403', element: <AccessDenied /> },
      ],
    },
    {
      path: '/',
      element:
        currentUser && currentUser.accessToken ? (
          <Navigate to="/dashboard" />
        ) : (
          <MainLayout />
        ),
      children: [
        { path: '/login', element: <Login /> },
        { path: '/recuperar/senha', element: <RecoverPassword /> },
        {
          path: '/primeiro/acesso/:hash',
          element: <SetVerifyPassword typeOperation="FIRST_ACCESS" />,
        },
        {
          path: '/recuperar/senha/:hash',
          element: <SetVerifyPassword typeOperation="RECOVER_PASSWORD" />,
        },
        { path: '/404', element: <NotFound /> },
        { path: '/403', element: <AccessDenied /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/login" /> },
      ],
    },
  ];
};

export default routes;
