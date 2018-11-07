'use strict';

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
//const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicUrl = "";
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: "production",
  entry: paths.serverRenderJs,
  target: 'node',
  output: {
    path: paths.server,
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  //resolve: {
    //modules: ['node_modules', paths.appNodeModules].concat(
      //process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    //),
    //extensions: ['.js', '.json', '.jsx'],
  //},
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: [
          /\.(js|jsx)$/,
          /\.json$/,
          /\.(gif|png|jpe?g|svg)$/i,
        ],
        loader: 'ignore',
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    //new ReactLoadablePlugin({
      //filename: paths.serverLoadableJson
    //}),
  ],
  optimization: {
    minimize: false
  },
  externals: {
    'react-loadable': 'react-loadable',
    'react': 'react',
    'react-dom/server': 'react-dom/server',
  }
};
