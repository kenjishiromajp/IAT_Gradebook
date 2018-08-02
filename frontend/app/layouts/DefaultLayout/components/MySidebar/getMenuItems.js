import { ALERTS_URL, METERS_URL, USERS_URL } from '../../../../utils/constants';

const USER_ROLE = 'USER_ROLE';
const ADMIN_ROLE = 'ADMIN_ROLE';

const getMenuItems = () => [
  {
    to: '/',
    title: 'Home',
    icon: 'dashboard',
  },
  {
    to: '/gradebook',
    title: 'GradeBook',
    icon: 'dashboard',
    // notAllowedRoles: [USER_ROLE, ADMIN_ROLE],
  },
];
export default getMenuItems;
