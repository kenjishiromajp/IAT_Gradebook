import {
  CHANGE_COMPANY_OF_LOGGED_USER,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SET_USER_ERROR,
  SET_USER_SUCCESS,
} from './constants';

export function loginUser(email, password, resolve, reject) {
  return {
    type: LOGIN_USER,
    email,
    password,
    resolve,
    reject,
  };
}

export function loginUserLoaded(currentUser) {
  return {
    type: LOGIN_USER_SUCCESS,
    currentUser,
  };
}

export function loginUserError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function changeCompanyOfLoggedUser(company) {
  return {
    type: CHANGE_COMPANY_OF_LOGGED_USER,
    company,
  };
}

export function setCurrentUserSuccess(user) {
  return {
    type: SET_USER_SUCCESS,
    user,
  };
}
export function setCurrentUserError(error) {
  return {
    type: SET_USER_ERROR,
    error,
  };
}
