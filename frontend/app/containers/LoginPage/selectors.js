import { createSelector } from 'reselect';
import transformObjectToArray from '../../utils/transformObjectToArray';

export const selectLoginPages = (state) => state.get('loginPages');

export const makeSelectLoginPages = () =>
  createSelector(selectLoginPages, (loginPageState) => {
    const loginPages = loginPageState.get('loginPages');
    return loginPages === null ? null : transformObjectToArray(loginPages);
  });

export const makeSelectLoginPagesLoading = () =>
  createSelector(selectLoginPages, (loginPageState) =>
    loginPageState.get('loading'));
