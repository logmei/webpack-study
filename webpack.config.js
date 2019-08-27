'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:{
        index: './src/main.js',
        search: './src/search.js'
    },
    output:{
        path : path.join(__dirname,'dist'),
        filename: '[name].js'
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
            {
                test:/\.scss$/,
                use:[
                'style-loader',
                'css-loader',
                'sass-loader'
               ]
            },//添加style-loader,css-loader,sass-loader
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                use:[{
                  loader:'file-loader',
                  options:{
                    name: 'img/[name]_[hash:8].[ext]'
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
            template:'./public/index.html'
        })
    ]
}