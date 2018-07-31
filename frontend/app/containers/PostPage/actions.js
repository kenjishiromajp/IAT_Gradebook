import {
  LOAD_POSTS,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST,
  REMOVE_POST_ERROR,
  REMOVE_POST_SUCCESS,
  CREATE_POST,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_ERROR,
  EDIT_POST_SUCCESS,
} from './constants';

// POST LOAD

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function postsLoaded(posts) {
  return {
    type: LOAD_POSTS_SUCCESS,
    posts,
  };
}

export function loadPostsError(error) {
  return {
    type: LOAD_POSTS_ERROR,
    error,
  };
}
// END POST LOAD

// CREATE POST
export function createPost(post, resolve, reject) {
  return {
    type: CREATE_POST,
    post,
    resolve,
    reject,
  };
}

export function createPostError(error) {
  return {
    type: CREATE_POST_ERROR,
    error,
  };
}

export function postCreated(post) {
  return {
    type: CREATE_POST_SUCCESS,
    post,
  };
}
// END CREATE POST

// EDIT POST
export function editPost(post, resolve, reject) {
  return {
    type: EDIT_POST,
    post,
    resolve,
    reject,
  };
}

export function editPostError(error) {
  return {
    type: EDIT_POST_ERROR,
    error,
  };
}

export function postEdited(post) {
  return {
    type: EDIT_POST_SUCCESS,
    post,
  };
}
// END EDIT POST

// REMOVE POST
export function removePost(id) {
  return {
    type: REMOVE_POST,
    id,
  };
}

export function removePostError(error) {
  return {
    type: REMOVE_POST_ERROR,
    error,
  };
}

export function postRemoved(id) {
  return {
    type: REMOVE_POST_SUCCESS,
    id,
  };
}

// END REMOVE POST
