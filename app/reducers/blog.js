import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { WP_CATEGORIES, WP_POSTS } from '../actions/wpApi';

const initialState = fromJS({
  posts: [],
  total: 0,
  categories: [],
  query: {},
  requesting: false,
});

export const BLOG_VIEW = 'blog';

export default function blogReducer(state = initialState, action) {
  if (!isEqual(action.view, BLOG_VIEW)) return state;
  switch (action.type) {
    case WP_POSTS.LIST.REQUESTED:
      return state.merge({
        requesting: true,
      });
    case WP_POSTS.LIST.FAILED:
      return state.merge({
        requesting: false,
      });
    case WP_POSTS.LIST.SUCCESS:
      return state.merge({
        posts: action.payload.posts,
        total: action.payload.total,
        query: action.payload.query,
        requesting: false,
      });
    case WP_CATEGORIES.LIST.SUCCESS:
      return state.merge({
        categories: action.payload.categories,
        requesting: false,
      });
    default:
      return state;
  }
}
