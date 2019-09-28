/* eslint-disable no-console */
/* eslint consistent-return:0 */

const request = require('request');
const express = require('express');
const logger = require('./logger');
const path = require('path');
const fs = require('fs');
const https = require('https');
const argv = require('./argv');
const port = require('./port');
const axios = require('axios');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const isHttps = process.env.HTTPS === 'true';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const prerender = require('prerender-node');
prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
// const prerenderServiceUrl =
//   process.env.PRERENDER_URL || 'http://prerender:3333';
// if (prerenderServiceUrl) {
//   prerender.set('prerenderServiceUrl', prerenderServiceUrl);
// }

prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');
app.use(prerender);

app.get('/sitemap.xml', (req, res) => {
  request(process.env.SITEMAP_URL).pipe(res);
});

app.get('/robots.txt', (req, res) => {
  request(process.env.ROBOTSTXT_URL).pipe(res);
});

function saveFeed() {
  return new Promise((resolve5, reject) => {
    axios.get(`${process.env.WP_URL}/feed`).then(feedRes => {
      const content = feedRes.data.replace(
        RegExp(process.env.WP_URL, 'g'),
        process.env.WEB_URL,
      );
      fs.writeFile(resolve(process.cwd(), 'feed.xml'), content, err => {
        if (err) {
          reject(err);
        }
        console.log('Feed file was saved!');
        resolve5('OK');
      });
    });
  });
}
app.get('/save-feed', (req, res) => {
  saveFeed()
    .then(data => res.send(data))
    .catch(e => res.status(500).send(e));
});

app.get('/feed', (req, res) => {
  fs.createReadStream(resolve(process.cwd(), 'feed.xml')).pipe(res);
});

function saveSEO() {
  return new Promise((resolve2, reject) => {
    axios
      .get(`${process.env.API_URL}/api/seo?limit=1`)
      .then(seoRes => seoRes.data.count)
      .then(count => {
        axios
          .get(`${process.env.API_URL}/api/seo?limit=${count}`)
          .then(seoRes2 => {
            const seoRes2Json = seoRes2.data;
            seoRes2Json.map = {};
            seoRes2Json.regex = [];
            while (seoRes2.data.results.length > 0) {
              const seo = seoRes2.data.results.pop();
              if (!seo.url_is_regex) {
                seoRes2Json.map[seo.url] = seo;
              } else {
                seoRes2Json.regex.push(seo);
              }
            }
            fs.writeFile(
              resolve(process.cwd(), 'seo.json'),
              JSON.stringify(seoRes2Json),
              err => {
                if (err) {
                  reject(err);
                }

                console.log('SEO file was saved!');
                resolve2('OK');
              },
            );
          });
      });
  });
}

saveSEO()
  .then(data => console.log(data))
  .catch(e => console.log(e));

saveFeed()
  .then(data => console.log(data))
  .catch(e => console.log(e));

app.get('/save-seo', (req, res) => {
  saveSEO()
    .then(data => res.send(data))
    .catch(e => res.status(500).send(e));
});

app.use((req, res, next) => {
  const start = Date.now();
  if (isDev) {
    next();
    return;
  }
  if (req.originalUrl === '/') {
    console.log(`Url: ${req.originalUrl} Time: ${Date.now() - start}ms`);
    next();
    return;
  }
  fs.readdir(resolve(process.cwd(), 'build'), (err, items) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    let url = req.originalUrl;
    if (req.originalUrl.includes('?')) {
      // eslint-disable-next-line prefer-destructuring
      url = req.originalUrl.split('?')[0];
    }
    if (url[url.length - 1] === '/') {
      if (url !== '/') {
        url = url.slice(0, -1);
      }
    }
    const filtered = items.filter(item => url.includes(item));
    if (filtered.length >= 1) {
      console.log(
        `Url: ${req.originalUrl} Parsed: ${url} Time: ${Date.now() - start}ms`,
      );
      next();
      return;
    }
    fs.readFile(resolve(process.cwd(), 'seo.json'), (err2, data) => {
      if (err2) {
        res.status(500).send(err2);
        return;
      }
      const seoData = JSON.parse(data.toString());
      let redirectSeo = seoData.map[req.originalUrl] || seoData.map[url];
      let redirectUrl = null;
      if (redirectSeo !== undefined) {
        if (redirectSeo.redirect_url) {
          redirectUrl = redirectSeo.redirect_url;
          console.log(
            `Url: ${
              req.originalUrl
            } Parsed: ${url} Redirect: ${redirectUrl} Time: ${Date.now() -
              start}ms`,
          );
          res.redirect(301, `${process.env.WEB_URL}${redirectUrl}`);
          return;
        }
        console.log(
          `Url: ${
            req.originalUrl
          } Parsed: ${url} Redirect: ${redirectUrl} Time: ${Date.now() -
            start}ms`,
        );
        next();
        return;
      }
      redirectSeo = seoData.regex.filter(
        seo => seo.url_is_regex && RegExp(seo.url).exec(url) !== null,
      );
      if (redirectSeo.length > 0) {
        redirectUrl = redirectSeo[0].redirect_url;
        const isMatch = redirectUrl.match(/\$[0-9]+/g);
        if (isMatch !== null && isMatch.length > 0) {
          const regex = new RegExp(redirectSeo[0].url, 'g');
          const exec = regex.exec(url);
          const replacementString = exec && exec[1];
          if (replacementString) {
            redirectUrl = redirectUrl.replace(/\$[0-9]+/g, replacementString);
          }
        }
        if (redirectUrl !== null) {
          console.log(
            `Url: ${
              req.originalUrl
            } Parsed: ${url} Redirect: ${redirectUrl} Time: ${Date.now() -
              start}ms`,
          );
          res.redirect(301, `${process.env.WEB_URL}${redirectUrl}`);
          return;
        }
        console.log(
          `Url: ${req.originalUrl} Seo: ${
            redirectSeo[0].url
          } Parsed: ${url} Redirect: ${redirectUrl} Time: ${Date.now() -
            start}ms`,
        );
        next();
        return;
      }
      console.log(
        `Url: ${req.originalUrl} Parsed: ${url} Status: 404 Time: ${Date.now() -
          start}ms`,
      );
      res.status(404);
      next();
    });
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

if (isHttps) {
  const certOptions = {
    key: fs.readFileSync(
      path.resolve(process.env.HTTPS_KEY_PATH || 'cert/server.key'),
    ),
    cert: fs.readFileSync(
      path.resolve(process.env.HTTPS_CRT_PATH || 'cert/server.crt'),
    ),
  };

  https.createServer(certOptions, app).listen(port);
} else {
  // Start your app.
  app.listen(port, host, async err => {
    if (err) {
      return logger.error(err.message);
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
      let url;
      try {
        url = await ngrok.connect(port);
      } catch (e) {
        return logger.error(e);
      }
      logger.appStarted(port, prettyHost, url);
    } else {
      logger.appStarted(port, prettyHost);
    }
  });
}
