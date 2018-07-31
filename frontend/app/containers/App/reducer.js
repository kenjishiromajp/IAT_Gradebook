import { fromJS } from 'immutable';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  TOGGLE_SIDEBAR,
} from '../../layouts/DefaultLayout/constants';

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: {
    token: 'eweqwehjqwquge',
    fumeiro: '',
  },
  sidebarOpened: true,
});

function appReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case LOGIN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('currentUser', {});
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('currentUser', action.user);
    case LOGIN_ERROR:
      return state.set('loading', false).set('error', action.error);
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
