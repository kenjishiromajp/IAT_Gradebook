import { STUDENT_ROLE } from '../../../../utils/constants';

const getMenuItems = () => [
  {
    to: '/',
    title: 'Home',
    icon: 'home',
    notAllowedRoles: [STUDENT_ROLE],
  },
  {
    to: '/gradebook',
    title: 'GradeBook',
    icon: 'book',
  },
];
export default getMenuItems;
