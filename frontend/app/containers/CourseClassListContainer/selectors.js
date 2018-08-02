import { createSelector } from 'reselect';
import { denormalizeCourseClass } from './normalizr';

export const selectCourseClass = (state) => state.get('courseClass');

export const makeSelectCourseClassLoading = () =>
  createSelector(selectCourseClass, (courseClassState) =>
    courseClassState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectCourseClass, (courseClassState) =>
    courseClassState.get('error'));

export const makeSelectCourseClass = () =>
  createSelector(selectCourseClass, (courseClassState) =>
    denormalizeCourseClass(courseClassState.get('courseClass').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectCourseClass, (courseClassState) =>
    courseClassState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectCourseClass, (courseClassState) =>
    courseClassState.get('totalCount'));
