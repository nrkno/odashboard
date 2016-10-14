var webpack = require('webpack');

module.exports = {

  devtool: '#inline-source-map',
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {comments: false}
    }),
    new webpack.optimize.DedupePlugin()
    */
  ],
  entry: {
    main: ['./src/main']
  },
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js'
  }
};
