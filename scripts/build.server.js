'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.env.APP_ENV = 'server';

process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');

const webpack = require('webpack');
const config = require('../config/webpack.config.server');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

if (!checkRequiredFiles([paths.serverRenderJs])) {
  process.exit(1);
}

function build() {
  console.log('Creating a server production build...');

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
}

build();
