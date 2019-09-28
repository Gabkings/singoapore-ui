import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { WP_CATEGORIES, WP_POSTS } from '../actions/wpApi';

const initialState = fromJS({
  posts: [],
  categories: [],
  post: null,
  relatedByTags: [],
  relatedByCategories: [],
  relatedBySlug: [],
  comments: [],
});

export const BLOG_POST_VIEW = 'blog_post';

export default function blogPostReducer(state = initialState, action) {
  if (!isEqual(action.view, BLOG_POST_VIEW)) return state;
  switch (action.type) {
    case WP_POSTS.LIST.SUCCESS:
      return state.merge({
        posts: action.payload.posts,
      });
    case WP_CATEGORIES.LIST.SUCCESS:
      return state.merge({
        categories: action.payload.categories,
      });
    case WP_POSTS.GET.REQUESTED:
      return state.merge({
        post: null,
      });
    case WP_POSTS.GET.SUCCESS:
      return state.merge({
        post: action.payload.post,
      });
    case WP_POSTS.GET.FAILED:
      return state.merge({
        post: action.payload,
      });
    case WP_POSTS.RELATED_BY_TAG.SUCCESS:
      return state.merge({
        relatedByTags: action.payload.relatedPosts,
      });
    case WP_POSTS.RELATED_BY_CATEGORY.SUCCESS:
      return state.merge({
        relatedByCategories: action.payload.relatedPosts,
      });
    case WP_POSTS.RELATED_BY_SLUG.SUCCESS:
      return state.merge({
        relatedBySlug: action.payload.relatedPosts,
      });
    default:
      return state;
  }
}
