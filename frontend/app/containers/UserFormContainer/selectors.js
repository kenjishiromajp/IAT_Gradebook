import { createSelector } from 'reselect';

export const selectUserForms = (state) => state.get('userForm');

export const makeSelectUserLoading = () =>
  createSelector(selectUserForms, (userFormState) =>
    userFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectUserForms, (userFormState) =>
    userFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectUserForms, (userFormState) =>
    userFormState.get('success'));
