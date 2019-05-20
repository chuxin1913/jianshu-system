const path =              require('path');
const webpack = require('webpack');
// const argv = JSON.parse(process.env.npm_config_argv).original;
// const contentBase = path.resolve(__dirname+'/src/index.jsx'+argv[atgv.length-1])
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'http://localhost:8089/',
    // publicPath: "/dist/"
    filename: 'js/index.js'
  },
  resolve:{
    alias:{
      page:path.resolve(__dirname, 'src/page')
    }
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
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins:[
               ['import',{libraryName:'antd', style:true}]]
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
            process.env.NODE_ENV !== 'production' ? 'style-loader': MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",       
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //       process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      //       "css-loader",
      //       "less-loader"
      //   ]
      // },
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader', 
        }, {
            loader: 'less-loader', 
            options: {
            modifyVars: {
                'primary-color': '#ff6600'
            },
            hmr: process.env.NODE_ENV === 'development',
            reloadAll: true,
            javascriptEnabled: true,
            },
        }],
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
        ]
      }
    ]
  },
  plugins: [
    //独立html文件
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    //独立css,less,sass文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      filename: 'sass/[name].sass',
      chunkFilename: '[id].sass',
      filename: 'less/[name].less',
      chunkFilename: '[id].less',
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