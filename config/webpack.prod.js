const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

/// 获取公共 css loader
const getStyleloader = (...tail) =>
  [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      /// 处理兼容性
      /// 配合 package.json 中 browserslist 指定的兼容性
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    ...tail,
  ].filter(Boolean);

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      /// 处理 css
      {
        test: /\.css$/,
        use: getStyleloader(),
      },
      /// 处理 less
      {
        test: /\.less$/,
        use: getStyleloader('less-loader'),
      },
      /// 处理 sass
      {
        test: /\.s(a|c)ss$/,
        use: getStyleloader('sass-loader'),
      },
      /// 处理 图片
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      /// 处理 iconfont
      {
        test: /\.(woff2?|ttf)$/,
        type: 'asset/resource',
      },
      /// 处理 js
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
    ],
  },

  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/.eslintcache'
      ),
    }),
    /// 处理 html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[name].[contenthash].chunk.css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime.${entrypoint.name}`,
    },
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
};
