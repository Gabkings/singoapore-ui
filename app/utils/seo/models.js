import { CATEGORIES, LISTINGS } from '../../actions/restApi';
import { WP_POSTS } from '../../actions/wpApi';

export const models = [CATEGORIES.MODEL, LISTINGS.MODEL];
export const mapping = {
  [CATEGORIES.MODEL]: 'services',
  [LISTINGS.MODEL]: 'professionals',
  [WP_POSTS.MODEL]: 'articles',
};
