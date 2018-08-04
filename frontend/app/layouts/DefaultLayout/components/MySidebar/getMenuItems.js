import {
  PRINCIPAL_ROLE,
  STUDENT_ROLE,
  TEACHER_ROLE,
} from '../../../../utils/constants';

const getMenuItems = () => [
  {
    to: '/',
    title: 'Home',
    icon: 'home',
    notAllowedRoles: [STUDENT_ROLE],
  },
  {
    to: '/users',
    title: 'Users',
    icon: 'user',
    notAllowedRoles: [STUDENT_ROLE, TEACHER_ROLE, PRINCIPAL_ROLE],
  },
  {
    to: '/gradebook',
    title: 'GradeBook',
    icon: 'book',
  },
];
export default getMenuItems;
