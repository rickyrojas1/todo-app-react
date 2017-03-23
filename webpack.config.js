var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './src/client/index.js',
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve('public'),
    publicPath: 'http://localhost:8080/public'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve('src', 'client', 'stylesheets')]
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader?cacheDirectory'
        ],
        include: path.resolve('src', 'client'),
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
