'use strict'
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {entry,htmlWebpackPlugins} = require('./src/util/webpackentrys_glob')
module.exports = {
    entry:entry,
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
                'css-loader',
                'postcss-loader',
                {
                  loader:'px2rem-loader',
                  options:{
                    remUnit:75,
                    remPrecision:8
                  }
                }
                ]
            },//添加style-loader,css-loader
            {
                test:/\.less$/,
                use:[
                'style-loader',
                'css-loader',
                'less-loader',
                'postcss-loader',
                {
                  loader:'px2rem-loader',
                  options:{
                    remUnit:75,
                    remPrecision:8
                  }
                }
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
                  loader: MiniCssExtractPlugin.loader,//css提取成文件
                  options: {
                    publicPath:'../',
                    hmr: process.env.NODE_ENV === 'production'
                  }
                },
                'css-loader',
                'sass-loader',
                'postcss-loader',
                {
                  loader:'px2rem-loader',//px转rem
                  options:{
                    remUnit:75,
                    remPrecision:8
                  }
                }
              ]
            },
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                use:[{
                  loader:'file-loader',
                  options:{
                    name:'img/[name]_[hash:8].[ext]'//图片文件增加hash
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
        // new HtmlWebpackPlugin({
        //     template:path.join(__dirname,'public/index.html'),
        //     filename:'index.html',
        //     chunks:['index','search'],
        //     inject:true,
        //     // minify:{//html压缩
        //     //   html5:true,
        //     //   collapseWhitespace:true,
        //     //   preserveLineBreaks:false,
        //     //   minifyCSS:true,
        //     //   minifyJS:true,
        //     //   removeComments:false
        //     // }
        // }),
        new MiniCssExtractPlugin({//提前css文件
          filename: 'css/[name]_[contenthash:8].css',
          chunkFilename: '[id]_[contenthash:8].css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new OptimizeCssAssetsWebpackPlugin({//css压缩
          assetNameRegExp:/\.css$/g,
          cssProcessor:require('cssnano')
        }),
        new CleanWebpackPlugin()//清除目录
    ].concat(htmlWebpackPlugins)
}