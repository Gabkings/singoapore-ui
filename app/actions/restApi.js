import { Api, API_URL, API_PREFIX } from '../utils/api';
import { getOptions, getPath } from '../utils/actionsUtil';
import {
  generateApiActions,
  generateRestActions,
  generateModelMap,
} from './apiUtil';
import { getToken } from '../utils/localStorage';

export const CATEGORIES = {
  MODEL: 'categories',
  GET_WITH_CHILDREN: generateApiActions('categories', 'GET_WITH_CHILDREN'),
  ...generateRestActions('categories'),
};

export const MERCHANTS = {
  MODEL: 'merchants',
  ...generateRestActions('merchants'),
};

export const CONSUMERS = {
  MODEL: 'consumers',
  ...generateRestActions('consumers'),
};

export const USERS = {
  MODEL: 'users',
  LOGOUT: generateApiActions('users', 'LOGOUT'),
  REGISTER: generateApiActions('users', 'REGISTER'),
  LOGIN: generateApiActions('users', 'LOGIN'),
  LOAD_AUTH: generateApiActions('users', 'LOAD_AUTH'),
  ACTIVATE: generateApiActions('users', 'ACTIVATE'),
  DEACTIVATE: generateApiActions('users', 'DEACTIVATE'),
  PASSWORD_RESET_EMAIL: generateApiActions('users', 'PASSWORD_RESET_EMAIL'),
  PASSWORD_RESET_SUBMIT: generateApiActions('users', 'PASSWORD_RESET_SUBMIT'),
  ...generateRestActions('users'),
};

export const GALLERIES = {
  MODEL: 'galleries',
  ...generateRestActions('galleries'),
};

export const FILES = {
  MODEL: 'files',
  ...generateRestActions('files'),
};

export const LISTINGS = {
  MODEL: 'listings',
  ...generateRestActions('listings'),
};

export const PROJECTS = {
  MODEL: 'projects',
  ...generateRestActions('projects'),
};

export const REVIEWS = {
  MODEL: 'reviews',
  ...generateRestActions('reviews'),
};

export const SEO = {
  MODEL: 'seo',
  ...generateRestActions('seo'),
};

export const FAVOURITES = {
  MODEL: 'favourites',
  ...generateRestActions('favourites'),
};

export const DEALS = {
  MODEL: 'deals',
  ...generateRestActions('deals'),
};

export const REPORTS = {
  MODEL: 'reports',
  ...generateRestActions('reports'),
};

export const FORM_SUBMISSIONS = {
  MODEL: 'form_submissions',
  ...generateRestActions('form_submissions'),
};

export const FEATURE_SWITCHES = {
  MODEL: 'feature_switches',
  ...generateRestActions('feature_switches'),
};

export const MODELS_LIST = [
  CATEGORIES,
  USERS,
  MERCHANTS,
  CONSUMERS,
  GALLERIES,
  LISTINGS,
  FILES,
  PROJECTS,
  REVIEWS,
  SEO,
  FAVOURITES,
  DEALS,
  REPORTS,
  FORM_SUBMISSIONS,
  FEATURE_SWITCHES,
];

export const MODEL_MAP = generateModelMap(MODELS_LIST);

export function get({ model, id, url, query, contentType }) {
  const options = getOptions({ method: 'GET', contentType, token: getToken() });
  const path = getPath({
    host: API_URL,
    prefix: API_PREFIX,
    model,
    id,
    url,
    query,
  });
  return Api(path, options);
}

export function post({ model, id, url, data, contentType }) {
  const options = getOptions({
    method: 'POST',
    data,
    contentType,
    token: getToken(),
  });
  const path = getPath({ host: API_URL, prefix: API_PREFIX, model, id, url });
  return Api(path, options);
}

export function put({ model, id, url, data, contentType }) {
  const options = getOptions({
    method: 'PUT',
    data,
    contentType,
    token: getToken(),
  });
  const path = getPath({ host: API_URL, prefix: API_PREFIX, model, id, url });
  return Api(path, options);
}

export function patch({ model, id, url, data, contentType }) {
  const options = getOptions({
    method: 'PATCH',
    data,
    contentType,
    token: getToken(),
  });
  const path = getPath({ host: API_URL, prefix: API_PREFIX, model, id, url });
  return Api(path, options);
}

export function deleteModel({ model, id, url, data, contentType }) {
  const options = getOptions({
    method: 'DELETE',
    data,
    contentType,
    token: getToken(),
  });
  const path = getPath({ host: API_URL, prefix: API_PREFIX, model, id, url });
  return Api(path, options);
}
