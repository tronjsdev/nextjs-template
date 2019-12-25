delete process.env.TS_NODE_PROJECT;

const path = require('path');
//const withCSS = require('@zeit/next-css');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const env = process.env.NODE_ENV;

// These env vars can be accessed in ./src/server/index.ts through `process.env.XXX`
// If want to access them in *.tsx files, have to map them in the env:{} section bellow
const dotEnvResult = dotenv.config({
  path: path.resolve(__dirname, `./src/config/dotenv/.env.${env}`),
});

dotenvExpand(dotEnvResult);

const prod = process.env.NODE_ENV === 'production';

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = {
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  //Uncomment the bellow if would to use process.env in *.tsx file
  env: {
    SECOND_SECRET: process.env.SECOND_SECRET,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    MY_SERVER_VAR: 'You only see me on server',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    MY_PUBLIC_VAR: 'You can see me either on server or client',
  },
};
