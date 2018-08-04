import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_USERS } from './constants';
import { loadUsersError, usersLoaded } from './actions';
import { normalizeUsers } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* usersSaga() {
  yield all([takeLatest(LOAD_USERS, getAllUsers)]);
}

export function* getAllUsers({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/users`, params);
    let users = response.items.length
      ? normalizeUsers(response.items).entities.users
      : {};
    users = fromJS(users);
    const { totalCount, perPage } = response._meta;
    yield put(usersLoaded(users, totalCount, perPage));
  } catch (error) {
    yield put(loadUsersError(error));
  }
}
