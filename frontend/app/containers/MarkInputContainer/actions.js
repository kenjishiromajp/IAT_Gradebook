import {
  CREATE_MARK,
  CREATE_MARK_ERROR,
  CREATE_MARK_SUCCESS,
  EDIT_MARK,
  EDIT_MARK_ERROR,
  EDIT_MARK_SUCCESS,
  EDIT_MARKS,
  EDIT_MARKS_ERROR,
  EDIT_MARKS_SUCCESS,
} from './constants';

// CREATE ALERT_CONFIGURATION_FORM
export function createMark(mark, resolve, reject) {
  return {
    type: CREATE_MARK,
    mark,
    resolve,
    reject,
  };
}

export function createMarkError(error) {
  return {
    type: CREATE_MARK_ERROR,
    error,
  };
}

export function markCreated(mark) {
  return {
    type: CREATE_MARK_SUCCESS,
    mark,
  };
}
// END CREATE ALERT_CONFIGURATION_FORM

// EDIT ALERT_CONFIGURATION_FORM
export function editMark(mark, resolve, reject) {
  return {
    type: EDIT_MARK,
    mark,
    resolve,
    reject,
  };
}

export function editMarkError(error) {
  return {
    type: EDIT_MARK_ERROR,
    error,
  };
}

export function markEdited(mark) {
  return {
    type: EDIT_MARK_SUCCESS,
    mark,
  };
}
// END EDIT ALERT_CONFIGURATION_FORM

// EDIT ALERT_CONFIGURATION_FORM
export function editMarks(marks, resolve, reject) {
  return {
    type: EDIT_MARKS,
    marks,
    resolve,
    reject,
  };
}

export function editMarksError(error) {
  return {
    type: EDIT_MARKS_ERROR,
    error,
  };
}

export function marksEdited(marks) {
  return {
    type: EDIT_MARKS_SUCCESS,
    marks,
  };
}
// END EDIT ALERT_CONFIGURATION_FORM
