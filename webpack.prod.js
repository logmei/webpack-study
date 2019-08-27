'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry:{
        index: './src/main.js',
        search: './src/search.js'
    },
    output:{
        path : path.join(__dirname,'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                'style-loader',
                'css-loader'
                ]
            },//添加style-loader,css-loader
            {
                test:/\.less$/,
                use:[
                'style-loader',
                'css-loader',
                'less-loader'
                ]
            },//添加style-loader,css-loader,less-loader
            // {
            //     test:/\.scss$/,
            //     use:[
            //     'style-loader',
            //     'css-loader',
            //     'sass-loader'
            //    ]
            // },
            //添加style-loader,css-loader,sass-loader
            {
              test:/\.(scss)$/,
              use:[
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath:'../',
                    hmr: process.env.NODE_ENV === 'production'
                  }
                },
                'css-loader',
                'sass-loader'
              ]
            },
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                use:[{
                  loader:'file-loader',
                  options:{
                    name:'img/[name]_[hash:8].[ext]'
                  }
                }]
            }
            // {
            //     test:/\.(jpg|png|gif|jpeg)$/,
            //     use:[
            //         {
            //             loader:'url-loader',
            //             options:{
            //                 limit:10240 //图片小于10k  webpack会对图片做base64转码，编译到js文件中
            //             }
            //         }
            //     ]
            // }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'public/index.html'),
            filename:'index.html',
            chunks:['index','search'],
            inject:true,
            minify:{
              html5:true,
              collapseWhitespace:true,
              preserveLineBreaks:false,
              minifyCSS:true,
              minifyJS:true,
              removeComments:false
            }
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name]_[contenthash:8].css',
          chunkFilename: '[id]_[contenthash:8].css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new OptimizeCssAssetsWebpackPlugin({
          assetNameRegExp:/\.css$/g,
          cssProcessor:require('cssnano')
        }),
        new CleanWebpackPlugin()
    ]
}