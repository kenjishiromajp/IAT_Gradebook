import { LOAD_USERS, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS } from './constants';

// USER LOAD

export function loadUsers(params) {
  return {
    type: LOAD_USERS,
    params,
  };
}

export function usersLoaded(users, totalCount, limit, offset) {
  return {
    type: LOAD_USERS_SUCCESS,
    users,
    totalCount,
    limit,
    offset,
  };
}

export function loadUsersError(error) {
  return {
    type: LOAD_USERS_ERROR,
    error,
  };
}
// END USER LOAD
