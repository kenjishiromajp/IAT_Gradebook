import { fromJS } from 'immutable';
import {
  CHANGE_COMPANY_OF_LOGGED_USER,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from './constants';
import { LOAD_DASHBOARD } from '../DashboardContainer/constants';

const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

const initialState = fromJS({
  loading: false,
  error: null,
  currentUser: fromJS(currentUser),
});

function loginReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case LOAD_DASHBOARD:
      return state.setIn(
        ['currentUser', 'dashboardHistory', 'branchId'],
        action.params.branchId
      );
    case LOGIN_USER:
      return state
        .set('loading', true)
        .set('error', null)
        .set('currentUser', fromJS({}));
    case LOGIN_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .set('currentUser', fromJS(action.currentUser));
    case LOGIN_USER_ERROR:
      return state.set('loading', false).set('error', {
        messageTitle: 'Erro',
        message: 'Falha falha na comunicação com servidor.',
      });
    case LOGOUT_USER:
      localStorage.clear();
      return state
        .set('loading', false)
        .set('error', null)
        .set('currentUser', fromJS({}));
    case CHANGE_COMPANY_OF_LOGGED_USER:
      let userUpdated = state.get('currentUser');
      userUpdated = userUpdated.setIn(['company'], fromJS(action.company));
      localStorage.setItem('currentUser', JSON.stringify(userUpdated.toJS()));
      return state.setIn(['currentUser', 'company'], fromJS(action.company));
    default:
      return state;
  }
}
export default loginReducer;
