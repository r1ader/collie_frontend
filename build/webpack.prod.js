process.env.NODE_ENV = 'production'
var path = require('path')
var webpack = require('webpack')
var proConfig = require('../src/config/pro.env')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var { CheckerPlugin } = require('awesome-typescript-loader')
var HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom', 'history']
  },
  output: {
    path: path.join(__dirname, '../prod/static'),
    filename: 'app-js/[name]-[chunkhash].js',
    publicPath: 'static/'
  },

  stats: {
    children: false,
    chunks: false,
    modules: false
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/, // 排除node_modules中的代码
      use: [{
        loader: 'babel-loader'
      }]
    },
    {
      test: /\.less$/,
      use: ['style-loader', {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader'
      }]
    },
    {
      test: /\.css$/,
      exclude: [/node_modules/, /src\/index\.css/],
      use: ['style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]'
            }
          }
        }]
    },
    {
      test: /\.css$/,
      include: [/node_modules/, /src\/index\.css/],
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@less': path.resolve(__dirname, 'src', 'assets', 'less')
    }
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        reactBase: {
          name: 'reactBase',
          test: (module) => {
            return /react|redux|prop-types/.test(module.context)
          },
          chunks: 'initial',
          priority: 10
        },
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      title: 'Marco',
      template: './index.ejs'
      // favicon: path.resolve(__dirname, 'src/assets/image/favicon.ico')
    })
  ]
}
