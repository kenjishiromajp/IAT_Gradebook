import { fromJS } from 'immutable';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  users: {},
  totalCount: 0,
  limit: 15,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return state.set('loading', true).set('error', null);
    case LOAD_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('users', action.users)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_USERS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default userReducer;
