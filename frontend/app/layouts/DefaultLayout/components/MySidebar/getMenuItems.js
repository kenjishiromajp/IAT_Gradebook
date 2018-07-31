import React from 'react';
import IconUnit from '../../../../components/Icons/IconUnit';
import IconKpi from '../../../../components/Icons/IconKpi';
import {
  ADMIN_ROLE,
  ALERTS_URL,
  BRANCHES_URL,
  METERS_URL,
  PERFORMANCE_INDEX_URL,
  USER_ROLE,
  USERS_URL,
} from '../../../../utils/constants';

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
    to: `/${BRANCHES_URL}`,
    title: 'Unidades',
    icon: <IconUnit />,
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
  {
    to: `/${PERFORMANCE_INDEX_URL}`,
    title: 'Índices de performance',
    icon: <IconKpi />,
  },
];
export default getMenuItems;
