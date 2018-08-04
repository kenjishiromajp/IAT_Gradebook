import { createSelector } from 'reselect';
import { denormalizeUsers } from './normalizr';

export const selectUsers = (state) => state.get('users');

export const makeSelectUsersLoading = () =>
  createSelector(selectUsers, (userState) => userState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectUsers, (userState) => userState.get('error'));

export const makeSelectUsers = () =>
  createSelector(selectUsers, (userState) =>
    denormalizeUsers(userState.get('users').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectUsers, (userState) => userState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectUsers, (userState) => userState.get('totalCount'));
