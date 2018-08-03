import { takeLatest, call, put, all } from 'redux-saga/effects';
import { putRequest, postRequest } from '../../utils/request';
import { CREATE_MARK, EDIT_MARK, EDIT_MARKS } from './constants';
import {
  createMarkError,
  editMarkError,
  editMarksError,
  markCreated,
  markEdited,
  marksEdited,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* markData() {
  yield all([
    takeLatest(CREATE_MARK, createMarkForm),
    takeLatest(EDIT_MARK, editMarkForm),
    takeLatest(EDIT_MARKS, editMarksForm),
  ]);
}

export function* createMarkForm({ mark, resolve, reject }) {
  try {
    const markFormData = yield call(postRequest, `${API_URL}/marks`, mark);
    resolve(markFormData);
    yield put(markCreated(markFormData));
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

export function* editMarksForm({ marks, resolve, reject }) {
  try {
    const markForm = yield call(putRequest, `${API_URL}/marks`, marks);
    resolve(markForm);
    yield put(marksEdited(markForm));
  } catch (error) {
    reject(error);
    yield put(editMarksError(error));
  }
}
