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
