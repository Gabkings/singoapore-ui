import fs from 'fs';
import { APPLICATION_JSON, getOptions, getPath } from '../actionsUtil';
import { Api, API_PREFIX, API_URL } from '../api';
import { models } from './models';
import { WP_POSTS, wpGet } from '../../actions/wpApi';

const results = {};

const getUrls = () => {
  wpGet({
    model: WP_POSTS.MODEL,
    contentType: APPLICATION_JSON,
    query: {
      per_page: 78,
    },
  })
    .then(response1 => {
      // console.log(response1.data);
      results[WP_POSTS.MODEL] = response1.data;
      fs.writeFileSync(
        `app/assets/${WP_POSTS.MODEL}.json`,
        JSON.stringify(results[WP_POSTS.MODEL], null, 2),
      );
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(WP_POSTS.MODEL, 'error', e);
    });
  for (let i = 0; i < models.length; i += 1) {
    const model = models[i];
    const options = getOptions({ method: 'GET' });
    let path = getPath({
      host: API_URL,
      prefix: API_PREFIX,
      model,
    });
    Api(path, options)
      .then(response1 => {
        // console.log(model, 'response1.data');
        path = getPath({
          host: API_URL,
          prefix: API_PREFIX,
          query: { limit: response1.data.count },
          model,
        });
        Api(path, options).then(response2 => {
          // console.log(model, 'response2.data');
          results[model] = response2.data.results;
          fs.writeFileSync(
            `app/assets/${model}.json`,
            JSON.stringify(response2.data.results, null, 2),
          );
        });
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(model, 'error', e);
      });
  }
};

getUrls();
