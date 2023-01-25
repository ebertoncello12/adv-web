import IconDashboard from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';

export const menuItemsList = [
  {
    name: 'Dashboard',
    Icon: IconDashboard,
    showMenu: false,
    href: `/dashboard`,
  },
  {
    name: 'Usuários',
    Icon: PersonIcon,
    showMenu: false,
    href: `/usuario`,
  },
];
