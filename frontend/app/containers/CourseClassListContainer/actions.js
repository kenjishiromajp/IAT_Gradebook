import {
  LOAD_COURSE_CLASS,
  LOAD_COURSE_CLASS_ERROR,
  LOAD_COURSE_CLASS_SUCCESS,
} from './constants';

// COURSE_CLASS LOAD

export function loadCourseClass(params) {
  return {
    type: LOAD_COURSE_CLASS,
    params,
  };
}

export function courseClassLoaded(courseClass, totalCount, limit, offset) {
  return {
    type: LOAD_COURSE_CLASS_SUCCESS,
    courseClass,
    totalCount,
    limit,
    offset,
  };
}

export function loadCourseClassError(error) {
  return {
    type: LOAD_COURSE_CLASS_ERROR,
    error,
  };
}
// END COURSE_CLASS LOAD
