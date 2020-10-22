const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: 'main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [ 'cache-loader', 'ts-loader' ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.ts$/
      })
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      redux: 'redux',
      thunk: 'redux-thunk',
      saga: 'redux-saga'
    })
  ],
  devServer: {
    port: 9000,
    open: true,
    contentBase: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@node_modules': path.resolve(__dirname, 'node_modules')
    },
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}