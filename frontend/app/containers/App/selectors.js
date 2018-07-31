import { createSelector } from 'reselect';

export const selectGlobal = (state) => state.get('global');
export const selectRouter = (state) => state.get('router');

export const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('currentUser'));

export const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('error'));

export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);
