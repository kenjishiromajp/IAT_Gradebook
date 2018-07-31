import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
