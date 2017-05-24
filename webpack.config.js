const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");


const isProd = process.env.NODE_ENV === 'production'; //true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  });
const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: {
      app: './src/app.js',
      contact: './src/contact.js',
      home: './src/home.js',
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
        {
          test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['env']
             }
           }
         },
        {
          test: /\.jpe?g|\.gif$|\.png|\.svg|\.woff|\.eot|\.ttf/,
           use: 'url-loader'
            }
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
      new HtmlWebpackPlugin({
        title: 'Contact Page',
        minify: {
          collapseWhitespace: true
        },
        hash: true,
        chunks: ['contact'],
        filename: 'contact.html',
        template: './src/contact.html', // Contact Page template
      }),
      new HtmlWebpackPlugin({
        title: 'Home Page',
        minify: {
          collapseWhitespace: true
        },
        hash: true,
        chunks: ['home'],
        filename: 'home.html',
        template: './src/home.html', // Contact Page template
      }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: !isProd,
        allChunks: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]
}
