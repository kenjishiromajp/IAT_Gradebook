import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_COURSE_CLASS } from './constants';
import { loadCourseClassError, courseClassLoaded } from './actions';
import { normalizeCourseClass } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* courseClassSaga() {
  yield all([takeLatest(LOAD_COURSE_CLASS, getAllCourseClass)]);
}

export function* getAllCourseClass({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/grades`, params);
    let courseClass = response.items.length
      ? normalizeCourseClass(response.items).entities.courseClass
      : {};
    courseClass = fromJS(courseClass);
    yield put(courseClassLoaded(courseClass, null, null));
  } catch (error) {
    yield put(loadCourseClassError(error));
  }
}
