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
            {test:/\.js$/,use:'babel-loader'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}