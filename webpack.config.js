const path = require('path')

module.exports = {
  target: 'web',
  entry: {
    main: './src/redux-component.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist'),
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    }]
  },
  resolve: {
    aliasFields: ['browser']
  },
  devtool: 'source-map'
}
