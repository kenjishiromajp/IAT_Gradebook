import { createSelector } from 'reselect';

export const selectLogin = (state) => state.get('login');

export const makeSelectCurrentUser = () =>
  createSelector(selectLogin, (loginState) =>
    loginState.get('currentUser').toJS());

export const makeSelectLoading = () =>
  createSelector(selectLogin, (loginState) => loginState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectLogin, (loginState) => loginState.get('error'));
