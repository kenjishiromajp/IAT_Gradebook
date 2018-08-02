import { fromJS } from 'immutable';
import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  TOGGLE_SIDEBAR,
} from '../../layouts/DefaultLayout/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  sidebarOpened: true,
});

function appReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return state.set('sidebarOpened', !state.get('sidebarOpened'));
    case OPEN_SIDEBAR:
      return state.set('sidebarOpened', true);
    case CLOSE_SIDEBAR:
      return state.set('sidebarOpened', false);
    default:
      return state;
  }
}
export default appReducer;
