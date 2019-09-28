import sm from 'sitemap';
import fs from 'fs';
import { mapping } from './models';

const HOSTNAME = 'https://sghomeneeds.com';

const results = {};

const allPromises = [];
allPromises.push(
  new Promise((resolve, reject) => {
    fs.readFile('app/assets/wp_posts.json', (err, data) => {
      if (err) {
        reject(err);
      }
      const parsed = JSON.parse(data);
      results.wp_posts = parsed;
      resolve(parsed);
    });
  }),
);
allPromises.push(
  new Promise((resolve, reject) => {
    fs.readFile('app/assets/categories.json', (err, data) => {
      if (err) {
        reject(err);
      }
      const parsed = JSON.parse(data);
      results.categories = parsed;
      resolve(parsed);
    });
  }),
);
allPromises.push(
  new Promise((resolve, reject) => {
    fs.readFile('app/assets/listings.json', (err, data) => {
      if (err) {
        reject(err);
      }
      const parsed = JSON.parse(data);
      results.listings = parsed;
      resolve(parsed);
    });
  }),
);
Promise.all(allPromises).then(() => {
  const sitemap = sm.createSitemap({
    hostname: HOSTNAME,
    cacheTime: 600000,
  });
  const keys = ['wp_posts', 'categories', 'listings'];
  for (let i = 0; i < keys.length; i += 1) {
    for (let j = 0; j < results[keys[i]].length; j += 1) {
      sitemap.add({
        url: `/${mapping[keys[i]]}/${results[keys[i]][j].slug}`,
      });
    }
  }
  fs.writeFileSync('app/assets/sitemap.xml', sitemap.toString());
});
