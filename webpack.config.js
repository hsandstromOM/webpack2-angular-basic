const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');


const isProd = process.env.NODE_ENV === 'production'; //true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  });
const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;


module.exports = {
    entry: {
      app: './src/app.js',
      bootstrap: bootstrapConfig
    },
    output: {
      path: path.resolve (__dirname + '/dist'), // `dist` is the destination
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: cssConfig
        },
        { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
        { test: /\.(ttf|eot)$/, loader: 'file-loader' },
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname + '/dist'),
      compress: true,
      hot: true,
      stats: 'errors-only',
      open: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Home Page',
        minify: {
          collapseWhitespace: true
        },
        hash: true,
        excludeChunks: ['contact', 'home'],
        template: './src/index.html', // Home Page template
      }),
      // new HtmlWebpackPlugin({
      //   title: 'Contact Page',
      //   minify: {
      //     collapseWhitespace: true
      //   },
      //   hash: true,
      //   chunks: ['contact'],
      //   filename: 'contact.html',
      //   template: './src/contact.html', // Contact Page template
      // }),
      // new HtmlWebpackPlugin({
      //   title: 'Alt Home Page',
      //   minify: {
      //     collapseWhitespace: true
      //   },
      //   hash: true,
      //   chunks: ['home'],
      //   filename: 'home.html',
      //   template: './src/home.html', // Contact Page template
      // }),
      new ExtractTextPlugin({
        filename: 'app.css',
        disable: !isProd,
        allChunks: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]
}
