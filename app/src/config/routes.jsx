import { Navigate } from 'react-router-dom';
import { GeneralLayout } from '../structure/LoggedStructure/GeneralLayout.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import Home from '../pages/dashboard/Home.jsx';
import RecoverPassword from '../pages/RecoverPassword.jsx';
import { SetVerifyPassword } from '../pages/SetVerifyPassword.jsx';
import AccessDenied from '../pages/AccessDenied.jsx';
import UnloggedLayout from "../structure/UnloggedStructure/UnloggedLayout.jsx";
import ProcessList from "../pages/Process/ProcessList.jsx";
import ProcessRegister from "../pages/Process/ProcessRegister.jsx";
import PersonDetails from "../pages/Person/PersonDetails.jsx";
import PersonSecurity from "../pages/Person/PersonSecurity.jsx";
import Financial from "../pages/Financial/Financial.jsx";
import Plan from "../pages/Financial/Plan.jsx";
import NotificationList from "../pages/Notification/NotificationList.jsx";

const routes = (currentUser) => {
  return [
    {
      element:
        currentUser ? (
          <GeneralLayout />
        ) : (
          <Navigate to="/login" />
        ),
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/processos',
          element: <ProcessList />,
        },
        {
          path: '/criar-processo',
          element: <ProcessRegister />,
        },
        {
          path: '/informacoes-pessoais',
          element: <PersonDetails />,
        },
        {
          path: '/seguranca',
          element: <PersonSecurity />,
        },
        {
          path: '/financeiro',
          element: <Financial />,
        },

        {
          path: '/publicacoes',
          element: <NotificationList />,
        },


        { path: '403', element: <AccessDenied /> },
      ],
    },
    {
      path: '/',
      element:
        currentUser ? (
          <Navigate to="/home" />
        ) : (
          <UnloggedLayout />
        ),
      children: [{ path: '/login', element: <Login /> }],
    },
  ];
};

export default routes;
