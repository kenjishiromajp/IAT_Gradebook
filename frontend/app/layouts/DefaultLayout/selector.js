import { createSelector } from 'reselect';
import { selectGlobal } from '../../containers/App/selectors';

export const makeSelectSidebarOpened = () =>
  createSelector(selectGlobal, (globalState) =>
    globalState.get('sidebarOpened'));

const selectRoute = (state) => state.get('route');

export const makeSelectError = () =>
  createSelector(selectRoute, (routeState) => routeState.get('error'));
