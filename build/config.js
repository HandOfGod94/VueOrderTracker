'use strict'
const pkg = require('../package')

module.exports = {
  title: 'blockchain-project',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    proxy: {
      '/**': 'http://localhost:3000'
    }
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
}
