import { fromJS } from 'immutable';
import {
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  EDIT_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function userFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_USER:
      return state.set('loading', true).set('error', null);
    case REMOVE_USER_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['user', action.id.toString()]);
    case REMOVE_USER_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_USER:
      return state.set('loading', true).set('error', null);
    case CREATE_USER_SUCCESS:
      return state
        .set('success', {
          user: action.user,
          message: `User ${action.user.id} criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_USER_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_USER:
      return state.set('loading', true).set('error', null);
    case EDIT_USER_SUCCESS:
      return state
        .set('success', {
          user: action.user,
          message: `User ${action.user.id} editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_USER_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default userFormReducer;
