import { takeLatest, call, put, all } from 'redux-saga/effects';
import { putRequest, postRequest } from '../../utils/request';
import { CREATE_MARK, EDIT_MARK } from './constants';
import {
  createMarkError,
  editMarkError,
  markCreated,
  markEdited,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* markData() {
  yield all([
    takeLatest(CREATE_MARK, createMarkForm),
    takeLatest(EDIT_MARK, editMarkForm),
  ]);
}

export function* createMarkForm({ mark, resolve, reject }) {
  try {
    const markData = yield call(postRequest, `${API_URL}/marks`, mark);
    resolve(markData);
    yield put(markCreated(markData));
  } catch (error) {
    reject(error);
    yield put(createMarkError(error));
  }
}

export function* editMarkForm({ mark, resolve, reject }) {
  try {
    const markForm = yield call(
      putRequest,
      `${API_URL}/marks/${mark.id}`,
      mark
    );
    resolve(markForm);
    yield put(markEdited(markForm));
  } catch (error) {
    reject(error);
    yield put(editMarkError(error));
  }
}
