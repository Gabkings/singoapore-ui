import { Api, WP_URL, WP_PREFIX } from '../utils/api';
import { getOptions, getPath } from '../utils/actionsUtil';
import {
  generateApiActions,
  generateModelMap,
  generateRestActions,
} from './apiUtil';

const wpGetOptions = ({ method, data, contentType, token }) => {
  const options = getOptions({ method, data, contentType, token });
  options.headers.Authorization = undefined;
  return options;
};

export const WP_POSTS = {
  MODEL: 'wp_posts',
  RELATED_BY_TAG: generateApiActions('wp_posts', 'RELATED_BY_TAG'),
  RELATED_BY_CATEGORY: generateApiActions('wp_posts', 'RELATED_BY_CATEGORY'),
  RELATED_BY_SLUG: generateApiActions('wp_posts', 'RELATED_BY_SLUG'),
  ...generateRestActions('wp_posts'),
};

export const WP_CATEGORIES = {
  MODEL: 'wp_categories',
  ...generateRestActions('wp_categories'),
};

export const MODELS_LIST = [WP_POSTS, WP_CATEGORIES];

export const MODEL_MAP = generateModelMap(MODELS_LIST);

const transformWPModel = model => model.replace('wp_', '');

export function wpGet({ model, id, url, query, contentType }) {
  const options = wpGetOptions({ method: 'GET', contentType });
  const path = getPath({
    host: WP_URL,
    prefix: WP_PREFIX,
    model: transformWPModel(model),
    id,
    url,
    query,
  });
  return Api(path, options);
}

export function wpPost({ model, id, url, data, contentType }) {
  const options = wpGetOptions({ method: 'POST', data, contentType });
  const path = getPath({
    host: WP_URL,
    prefix: WP_PREFIX,
    model: transformWPModel(model),
    id,
    url,
  });
  return Api(path, options);
}

export function wpPut({ model, id, url, data, contentType }) {
  const options = wpGetOptions({ method: 'PUT', data, contentType });
  const path = getPath({
    host: WP_URL,
    prefix: WP_PREFIX,
    model: transformWPModel(model),
    id,
    url,
  });
  return Api(path, options);
}

export function wpPatch({ model, id, url, data, contentType }) {
  const options = wpGetOptions({ method: 'PATCH', data, contentType });
  const path = getPath({
    host: WP_URL,
    prefix: WP_PREFIX,
    model: transformWPModel(model),
    id,
    url,
  });
  return Api(path, options);
}

export function wpDeleteModel({ model, id, url, data, contentType }) {
  const options = wpGetOptions({ method: 'DELETE', data, contentType });
  const path = getPath({
    host: WP_URL,
    prefix: WP_PREFIX,
    model: transformWPModel(model),
    id,
    url,
  });
  return Api(path, options);
}
