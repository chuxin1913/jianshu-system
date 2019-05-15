const path =              require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// require('font-awesome-webpack')
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/index.js'
  },
  mode: "development",
  module: {
    rules: [
      //react(jsx)语法配置
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      //css文件配置
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ]
      },
      //scss配置
      {
        test: /\.scss$/,
        use: [
            // fallback to style-loader in development
            process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
      },
      //图片配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
        ]
      },
      //字体图标配置
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
          // 'file-loader'
        ]
      },
      //antd配置
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            "plugins": [
              ["import", {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": "css" // `style: true` 会加载 less 文件
              }]
            ]
          }
        }
      } 
    ]
  },
  plugins: [
    //独立html文件
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    //独立css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    // 独立sass文件
    new MiniCssExtractPlugin({
      filename: 'sass/[name].sass',
      chunkFilename: '[id].sass',
    }),
    
  ],
  //独立公共模块
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
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    //  contentBase: './dist'
    port:8089
  }
};