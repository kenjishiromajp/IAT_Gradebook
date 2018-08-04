import {
  REMOVE_USER,
  REMOVE_USER_ERROR,
  REMOVE_USER_SUCCESS,
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_ERROR,
  EDIT_USER_SUCCESS,
} from './constants';

// CREATE USER_FORM
export function createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

export function createUserFormError(error) {
  return {
    type: CREATE_USER_ERROR,
    error,
  };
}

export function userFormCreated(user) {
  return {
    type: CREATE_USER_SUCCESS,
    user,
  };
}
// END CREATE USER_FORM

// EDIT USER_FORM
export function editUser(user) {
  return {
    type: EDIT_USER,
    user,
  };
}

export function editUserError(error) {
  return {
    type: EDIT_USER_ERROR,
    error,
  };
}

export function userEdited(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
}
// END EDIT USER_FORM

// REMOVE USER_FORM
export function removeUserForm(id) {
  return {
    type: REMOVE_USER,
    id,
  };
}

export function removeUserError(error) {
  return {
    type: REMOVE_USER_ERROR,
    error,
  };
}

export function userRemoved(id) {
  return {
    type: REMOVE_USER_SUCCESS,
    id,
  };
}

// END REMOVE USER_FORM
