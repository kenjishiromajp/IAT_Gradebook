import { createSelector } from 'reselect';
import transformObjectToArray from '../../utils/transformObjectToArray';

export const selectPosts = (state) => state.get('posts');

export const makeSelectPostsLoading = () =>
  createSelector(selectPosts, (postState) => postState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectPosts, (postState) => postState.get('error'));

export const makeSelectPosts = () =>
  createSelector(selectPosts, (postState) => {
    const posts = postState.get('posts');
    return posts ? transformObjectToArray(posts) : null;
  });
