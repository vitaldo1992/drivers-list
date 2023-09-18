const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv.development === true;
  const isEnvProduction = webpackEnv.production === true;
  const isEnvAnalyzeBundle = isEnvProduction && webpackEnv.analyze === true;

  process.env.NODE_ENV =
    process.env.NODE_ENV || isEnvProduction
      ? 'production'
      : isEnvDevelopment
      ? 'development'
      : undefined;

  process.env.BABEL_ENV = process.env.NODE_ENV;
  const getClientEnvironment = require('./env');

  // NOTE: No trailing slash as `${PUBLIC_URL}/foo/bar` looks better than
  //       `${PUBLIC_URL}foo/bar`.
  const env = getClientEnvironment('.');

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    bail: isEnvProduction,
    target: 'web',
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index',
    output: {
      path: isEnvProduction ? path.resolve(__dirname, 'dist') : undefined,
      publicPath: './',
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js'
    },
    devServer: {
      contentBase: [`${__dirname}/public/`],
      watchContentBase: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      quiet: true,
      overlay: true,
      historyApiFallback: true,
      hot: true,
      transportMode: 'ws',
      publicPath: '/',
      stats: 'minimal'
      //headers: { 'Access-Control-Allow-Origin': '*' },
      //https: false
    },
    plugins: [
      isEnvAnalyzeBundle && new BundleAnalyzerPlugin(),
      isEnvProduction &&
        new CopyPlugin({
          patterns: [{ from: `${__dirname}/public`, to: `${__dirname}/dist` }]
        }),
      new CaseSensitivePathsPlugin(),
      new webpack.DefinePlugin(env.stringified),
      new webpack.ProvidePlugin({
        'window.jQuery': 'jquery'
      }),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: `${__dirname}/src/index.html`
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.css$/,
          use: [
            // Creates `style` nodes from JS strings
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
              loader: MiniCssExtractPlugin.loader,
              // css is located in `static/css`, use '../../' to locate index.html folder
              // in production `paths.publicUrlOrPath` can be a relative path
              options: {
                publicPath: '../../'
              }
            },
            // Translates CSS into CommonJS
            'css-loader'
          ].filter(Boolean)
        },
        {
          test: /\.html$/i,
          loader: 'html-loader'
        }
      ]
    }
  };
};
