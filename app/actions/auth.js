import { Api } from '../utils/api';
import { getOptions, getPath } from '../utils/actionsUtil';

export function loadAuth({ model, id, url, data, contentType }) {
  const options = getOptions({ method: 'POST', data, contentType });
  const path = getPath({ model, id, url });
  return Api(path, options);
}
