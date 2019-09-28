import axios from 'axios';

export function Api(path, options = { method: 'POST', data: {} }) {
  return axios({ url: path, ...options })
    .then(response => response)
    .catch(error => ({ error }));
}

// export const API_URL = 'https://sghomeneeds-web.herokuapp.com';
// export const API_URL = 'http://localhost:8000';
export const { API_URL, WP_URL, FORMIO_URL, WEB_URL } = process.env;
export const API_PREFIX = 'api';
export const WP_PREFIX = 'wp-json/wp/v2';
