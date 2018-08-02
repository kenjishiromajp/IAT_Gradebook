export const isValidUser = (user) => !!Object.keys(user).length;

export const checkInvalidRole = (userRole, roles) =>
  roles.filter((role) => role === userRole).length;
