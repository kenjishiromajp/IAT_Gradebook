import { ALERTS_URL, METERS_URL, USERS_URL } from '../../../../utils/constants';

const USER_ROLE = 'USER_ROLE';
const ADMIN_ROLE = 'ADMIN_ROLE';

const getMenuItems = () => [
  {
    to: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
  },
  {
    to: '/empresas',
    title: 'Empresas',
    icon: 'dashboard',
    notAllowedRoles: [USER_ROLE, ADMIN_ROLE],
  },
  {
    to: '/consumo',
    title: 'Análises',
    icon: 'area-chart',
    subMenu: [
      {
        to: '/consumo',
        title: 'Consumo',
        icon: 'bar-chart',
      },
      {
        to: '/demanda',
        title: 'Demanda',
        icon: 'area-chart',
      },
      {
        to: '/rateio',
        title: 'Rateio',
        icon: 'pie-chart',
      },
      {
        to: '/horario-produtivo',
        title: 'Horário Produtivo',
        icon: 'pie-chart',
      },
      {
        to: '/horario-ponta',
        title: 'Horário de Ponta',
        icon: 'pie-chart',
      },
    ],
  },
  {
    to: `/${METERS_URL}`,
    title: 'Medidores',
    icon: 'wifi',
  },
  {
    to: `/${USERS_URL}`,
    title: 'Usuários',
    icon: 'user',
    notAllowedRoles: ['user'],
  },
  {
    to: '/exportacao',
    title: 'Exportação',
    icon: 'cloud-download',
  },
  {
    to: `/${ALERTS_URL}`,
    title: 'Alertas',
    icon: 'warning',
  },
];
export default getMenuItems;
