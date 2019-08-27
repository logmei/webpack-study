'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
            // {
            //     test:/\.(jpg|png|gif|jpeg)$/,
            //     use:'file-loader'
            // }
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240 //图片小于10k  webpack会对图片做base64转码，编译到js文件中
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name]_[contenthash:8].css',
          chunkFilename: '[id]_[contenthash:8].css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ]
}