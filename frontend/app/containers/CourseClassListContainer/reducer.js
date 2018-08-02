import { fromJS } from 'immutable';
import {
  LOAD_COURSE_CLASS,
  LOAD_COURSE_CLASS_SUCCESS,
  LOAD_COURSE_CLASS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  courseClass: {},
  totalCount: 0,
  limit: 15,
});

function courseClassReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COURSE_CLASS:
      return state.set('loading', true).set('error', null);
    case LOAD_COURSE_CLASS_SUCCESS:
      return state
        .set('loading', false)
        .set('courseClass', action.courseClass)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_COURSE_CLASS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default courseClassReducer;
