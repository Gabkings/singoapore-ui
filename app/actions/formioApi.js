import { Api, FORMIO_URL } from '../utils/api';
import { getOptions, getPath } from '../utils/actionsUtil';
import { generateRestActions } from './apiUtil';

export const FORMIO_FORM = {
  MODEL: 'FORMIO_FORM',
  ...generateRestActions('FORMIO_FORM'),
};

export function formioGet({ slugPath, contentType }) {
  const options = getOptions({ method: 'GET', contentType });
  const path = getPath({
    host: FORMIO_URL,
    model: slugPath,
  });
  return Api(path, options);
}
