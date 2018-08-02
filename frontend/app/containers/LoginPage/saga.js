import { takeLatest, call, put, all } from 'redux-saga/effects';
import { postRequest } from '../../utils/request';
import { LOGIN_USER } from './constants';
import {
  loginUserError,
  loginUserLoaded,
  setCurrentUserError,
  setCurrentUserSuccess,
} from './actions';
import { API_URL } from '../../utils/constants';
import { EDIT_MY_PROFILE_SUCCESS } from '../UserFormContainer/constants';

export default function* loginUser() {
  yield all([
    takeLatest(LOGIN_USER, getAllLoginUser),
    takeLatest(EDIT_MY_PROFILE_SUCCESS, setCurrentUser),
  ]);
}

const setCurrentUserLocalStorage = (currentUser) =>
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

export function* getAllLoginUser({ resolve, reject, ...action }) {
  try {
    const { email, password } = action;
    const user = yield call(postRequest, `${API_URL}/login`, {
      email,
      password,
    });
    const currentUser = user.data;
    yield setCurrentUserLocalStorage(currentUser);
    yield put(loginUserLoaded(currentUser));
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* setCurrentUser({ user }) {
  try {
    setCurrentUserLocalStorage(user);
    yield put(setCurrentUserSuccess(user));
  } catch (error) {
    yield put(setCurrentUserError(error));
  }
}
