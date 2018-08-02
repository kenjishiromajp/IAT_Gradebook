import { createSelector } from 'reselect';

export const selectGlobal = (state) => state.get('global');
export const selectRouter = (state) => state.get('router');
export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);
