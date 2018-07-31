import { takeLatest, call, put, all } from 'redux-saga/effects';
import request, {
  deleteRequest,
  putRequest,
  postRequest,
} from '../../utils/request';
import { CREATE_POST, EDIT_POST, LOAD_POSTS, REMOVE_POST } from './constants';
import {
  createPostError,
  editPostError,
  loadPostsError,
  postCreated,
  postEdited,
  postRemoved,
  postsLoaded,
  removePostError,
} from './actions';
import normalizePosts from './normalizr';
import { fromJS } from '../../../node_modules/immutable/dist/immutable';
import { API_URL } from '../../utils/constants';

export default function* postsData() {
  yield all([
    takeLatest(LOAD_POSTS, getAllPosts),
    takeLatest(CREATE_POST, createPost),
    takeLatest(EDIT_POST, editPost),
    takeLatest(REMOVE_POST, removePost),
  ]);
}

export function* getAllPosts() {
  try {
    let posts = yield call(request, `${API_URL}/posts`);
    posts = posts.length ? normalizePosts(posts).entities.posts : {};
    posts = fromJS(posts);
    yield put(postsLoaded(posts));
  } catch (error) {
    yield put(loadPostsError(error));
  }
}

export function* createPost({ resolve, reject, ...action }) {
  try {
    const post = yield call(postRequest, `${API_URL}/posts`, action.post);
    yield put(postCreated(post));
    resolve(post);
  } catch (error) {
    yield put(createPostError(error));
    reject(error);
  }
}

export function* editPost({ resolve, reject, ...action }) {
  try {
    const post = yield call(
      putRequest,
      `${API_URL}/posts/${action.post.id}`,
      action.post
    );
    yield put(postEdited(post));
    resolve(post);
  } catch (error) {
    yield put(editPostError(error));
    reject(error);
  }
}

export function* removePost({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/posts/${id}`);
    yield put(postRemoved(id));
  } catch (error) {
    yield put(removePostError(id, error));
  }
}
