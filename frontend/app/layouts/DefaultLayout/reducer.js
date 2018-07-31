import { fromJS } from 'immutable';
import { RequestError } from '../../utils/request';

const initialState = fromJS({
  error: null,
});

function routeReducer(state = initialState, { error, type }) {
  if (type === '@@router/LOCATION_CHANGE') {
    return state.set('error', null);
  }
  if (
    error instanceof RequestError &&
    (error.response.statusCode === '404' ||
      error.response.statusCode === '401' ||
      error.response.statusCode === '403' ||
      /^5\d{2}$/.test(error.response.statusCode))
  ) {
    return state.set('error', error);
  }
  return state;
}

export default routeReducer;
