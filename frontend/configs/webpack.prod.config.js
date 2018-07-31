const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = require('./_webpack.base.config')({
  mode: 'production',
  entry: [path.join(process.cwd(), 'app/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      name: true,
      cacheGroups: {
        default: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 2,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'vendors',
          enforce: true,
          test: (module) =>
            module.resource &&
            (module.resource.startsWith(path.join(process.cwd(), 'node_modules')) ||
              module.resource.startsWith(path.join(process.cwd(), 'vendor'))),
          priority: -10,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          test: (module) =>
            module.resource &&
            module.resource.startsWith(path.join(process.cwd(), 'src')),
          priority: -5,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      caching: true,
      collections: true,
      paths: true,
      shorthands: true,
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new OfflinePlugin({
      ServiceWorker: {
        minify: false,
      },
      relativePaths: false,
      publicPath: '/',
      excludes: ['.htaccess'],
      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js'],
      },
      safeToUseOptionalCaches: true,
      AppCache: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
    }),
  ],
  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
