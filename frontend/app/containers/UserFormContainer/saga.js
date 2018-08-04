import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import { CREATE_USER, EDIT_USER, REMOVE_USER } from './constants';
import {
  createUserFormError,
  editUserError,
  userFormCreated,
  userEdited,
  userRemoved,
  removeUserError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* userData() {
  yield all([
    takeLatest(CREATE_USER, createUserForm),
    takeLatest(EDIT_USER, editUserForm),
    takeLatest(REMOVE_USER, removeUser),
  ]);
}

export function* createUserForm({ user }) {
  try {
    const userForm = yield call(postRequest, `${API_URL}/users`, user);
    yield put(userFormCreated(userForm.data));
  } catch (error) {
    yield put(createUserFormError(error));
  }
}

export function* editUserForm({ user }) {
  try {
    const userForm = yield call(putRequest, `${API_URL}/user/${user.id}`, user);
    yield put(userEdited(userForm.data));
  } catch (error) {
    yield put(editUserError(error));
  }
}

export function* removeUser({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/user/${id}`);
    yield put(userRemoved(id));
  } catch (error) {
    yield put(removeUserError(id, error));
  }
}
