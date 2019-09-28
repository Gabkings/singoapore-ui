import QueryString from 'query-string';
// import { getToken } from './localStorage';

export const APPLICATION_JSON = 'application/json';
export const MULTIPART_FORM_DATA = 'multipart/form-data';

export function getOptions({ method, data, contentType, token }) {
  const authHeader = {};
  if (token !== undefined && token !== null) {
    authHeader['x-jwt-token'] = token;
  } else {
    authHeader.Authorization = `Basic ${btoa(
      `public:${process.env.PUBLIC_PASSWORD}`,
    )}`;
  }
  switch (contentType) {
    case MULTIPART_FORM_DATA:
      return {
        method,
        headers: { 'content-type': MULTIPART_FORM_DATA, ...authHeader },
        data,
      };
    default:
      return {
        method,
        headers: { 'content-type': APPLICATION_JSON, ...authHeader },
        data,
      };
  }
}

export function getPath({ host, prefix, model, id, url, query }) {
  let path = `${host}`;
  if (prefix) path += `/${prefix}`;
  path += `/${model}`;
  if (id) path += `/${id}`;
  if (url) path += `/${url}`;
  if (query) path += `?${QueryString.stringify(query)}`;
  return path;
}
