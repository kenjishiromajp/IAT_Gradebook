import { fromJS } from 'immutable';
import {
  CREATE_MARK,
  CREATE_MARK_SUCCESS,
  CREATE_MARK_ERROR,
  EDIT_MARK_SUCCESS,
  EDIT_MARK,
  EDIT_MARK_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function markFormReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MARK:
      return state.set('loading', true).set('error', null);
    case CREATE_MARK_SUCCESS:
      return state
        .set('success', {
          mark: action.mark,
          message: `Configuração de Alerta ${action.mark.id} Created!`,
        })
        .set('loading', false);
    case CREATE_MARK_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_MARK:
      return state.set('loading', true).set('error', null);
    case EDIT_MARK_SUCCESS:
      return state
        .set('success', {
          mark: action.mark,
          message: `AlertConfiguration ${action.mark.id} edited!`,
        })
        .set('loading', false);
    case EDIT_MARK_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default markFormReducer;
