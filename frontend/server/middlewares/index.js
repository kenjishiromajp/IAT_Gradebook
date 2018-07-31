module.exports = (app, options) => {
  const isDev = process.env.NOVE_ENV !== 'production';
  if (isDev) {
    const webpackConfig = require('../../configs/webpack.dev.config');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  } else {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  }
  return app;
};
