import { fromJS } from 'immutable';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_ERROR,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  posts: {},
});

function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return state.set('loading', true).set('error', null);
    case LOAD_POSTS_SUCCESS:
      return state.set('loading', false).set('posts', action.posts);
    case LOAD_POSTS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case REMOVE_POST:
      return state.set('loading', true).set('error', null);
    case REMOVE_POST_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['posts', action.id.toString()]);
    case REMOVE_POST_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_POST:
      return state.set('loading', true).set('error', null);
    case CREATE_POST_SUCCESS:
      return state
        .set('loading', false)
        .mergeDeep({ posts: { [action.post.id.toString()]: action.post } });
    case CREATE_POST_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_POST:
      return state.set('loading', true).set('error', null);
    case EDIT_POST_SUCCESS:
      return state
        .set('loading', false)
        .mergeDeep({ posts: { [action.post.id.toString()]: action.post } });
    case EDIT_POST_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default postReducer;
