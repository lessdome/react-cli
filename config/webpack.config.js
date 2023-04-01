const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')

const mode = process.env.NODE_ENV

const isProduction = mode === 'production'

/// 获取公共 css loader
const getStyleloader = (...tail) =>
  [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    {
      /// 处理兼容性
      /// 配合 package.json 中 browserslist 指定的兼容性
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env',
            [
              'postcss-px-to-viewport',
              {
                unitToConvert: 'px',
                viewportWidth: 375,
                unitPrecision: 10,
                minPixelValue: 0,
              },
            ],
          ],
        },
      },
    },
    ...tail,
  ].filter(Boolean)

module.exports = {
  mode,
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  entry: {
    main: path.resolve(__dirname, './../src/main.tsx'),
  },
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    clean: true,
    publicPath: '/',
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
          plugins: [!isProduction && 'react-refresh/babel'].filter(Boolean),
        },
      },
      /// 处理 ts
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
      },
    ],
  },

  plugins: [
    /// 处理 html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      scriptLoading: 'blocking',
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[name].[contenthash].chunk.css',
      }),
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助快速启用 ServiceWorkers
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    /// react hmr
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: entrypoint => `runtime.${entrypoint.name}`,
    },
    minimizer: [isProduction && new CssMinimizerWebpackPlugin(), isProduction && new TerserWebpackPlugin()].filter(
      Boolean,
    ),
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/store': path.resolve(__dirname, '../src/store'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
      '@/views': path.resolve(__dirname, '../src/views'),
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.less', '.scss', '.sass', '.ts', '.tsx'],
  },
  ...(!isProduction
    ? {
        devServer: {
          host: '127.0.0.1',
          port: 8999,
          open: false,
          hot: true,
          historyApiFallback: true,
        },
      }
    : {}),
}
