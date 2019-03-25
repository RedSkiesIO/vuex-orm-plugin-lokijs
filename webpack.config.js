var path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vuex-orm-plugin-loki.js',
    library: 'vuex-orm-plugin-loki',
    libraryTarget: 'umd'
  }
};