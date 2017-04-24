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
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {presets: ['es2015']},
    }],
  }
}

module.exports.devtool = '#source-map'
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  })
]);


