const resolve = require('path').resolve;

const app = require('express')();
const logger = require('./logger');

const arguments = require('./arguments');

const port = parseInt(arguments.port || process.env.PORT || '3000', 10);
const setup = require('./middlewares');
const isDev = process.env.NODE_ENV !== 'production';

const customHost = arguments.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
