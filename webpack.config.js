var path = require('path');
var webpack = require('webpack')

var node_dir = path.resolve(__dirname, './node_modules');


module.exports = {
  context: path.resolve(__dirname, './src/assets/js'),
  entry: {
    main: './main.js',
    vendor: './vendor.js'
  },
  resolve: {
    alias: {
      'jquery': node_dir + '/jquery/dist/jquery.js',
  }},
  output: {
    path: path.resolve(__dirname, './dist/assets/js/'),
    filename: '[name].js',
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015-ie', 'babili']
      }
    }]
  }
}
