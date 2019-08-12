#### 常见的loaders
* babel-loader 转换es6、es7等js新特性语法
* css-loader 支持css文件的加载和解析
* less-loader 将less文件解析成css
* ts-loader 将ts转换成js
* file-loader 进行图片、字体等的打包
* raw-loader 将文件以字符串的形式导入
* thread-loader 多线程打包css和js
  > 用法：
  ```js
  const path = require('path');
  module.exports={
      output:{
          filename:'bundle.js'
      },
      module:{
          rules:[
              {test:/\.txt$/,use:'raw-loader'} //test:指定匹配规则 ， use:指定使用的loader名称
          ]
      }
  }
  ```
#### 常用的plugins
* CommonsChunkPlugin:将chunks相同的模块代码提取成公共js
* CleanWebpackPlugin:清理构建目录
* ExtractTextWebpackPlugin:将css从bundle文件里提取成一个独立的css文件
* CopyWebpackPlugin:将文件或者文件拷贝到构建的输出目录
* HtmlWebpackPlugin:创建html文件去承载输出的bundle(多页面打包时使用)
* UglifyjsWebpackPlugin:压缩js
* ZipWebpaackPlugin:将打包出的资源生成一个zip包
  > 用法：
  ```js
  const path = require('path');
  module.exports = {
      output: {
          filename:'bundle.js'
      },
      plugins:[
          new HtmlWebpackPlugin({
              template:'./src/index.html'
          })
      ]
  }
  ```
#### mode构建环境
* production:设置process.env.NODE_ENV的值为production,默认开启一些插件FlagDependencyUsagePlugin,FlagIncludeChunksPlugin,ModuleConcatenationPlugin,
  NoEmitOnErrorPlugin,OccurrenceOrderPlugin,SideEffectsFlagPlugin和TerserPlugin
* development：设置process.env.NODE_ENV的值为development,开启NamedChunksPlugin和NamedModulesPlugin
* none:不开启任何插件
#### 添加es6解析
> 解析es6的语法需要babel-loader,而babel-loader依赖于babel,所以需要建立babel的配置文件.babelrc
 ```js
 {
     "presets":[],//presets为一系列babel plugins的集合
     "plugins":[] //一个plugin对应一个功能
 }
 ```
* 1、安装npm i @babel/core @babel/preset-env babel-loader -D
> -D:--save-dev   
* 2、创建.babelrc文件，添加presets
  ```js
  {
      "presets":[
          "@babel/preset-env" //es6的babel preset配置
      ]
  }
  ```
* 3、在webpack.config.js中添加babel-loader,只校验js就可以
  ```js
  module.exports = {
      entry:{...},
      output:{...},
      mode:"production",
      module:{
          rules:[
              {test:/\.js$/,use:'babel-loader'}
          ]
      }

  }
  ```
 * 4、npm run build
 #### 添加react jsx解析
 * 1、安装插件 npm i react react-dom @babel/preset-react -D
 * 2、添加presets
  ```js
  {
      presets:[
          "@babel/preset-react"
      ]
  }
  ```
* 3、编写测试代码
  ```js
  'use strict'
    import React from 'react';
    import ReactDom from 'react-dom';

    class Search extends React.Component {
        render(){
            return <div>Search Test</div>
        }
    }

    ReactDom.render(
        <Search/>,
        document.getElementById('root')
    )
  ```
#### 添加html模板解析
> 添加插件html-webpack-plugin，自动解析模板，不用每次去创建html
* 1、安装 npm i html-webpack-plugin -D
* 2、在webpack.config.js中引用 const HtmlWebpackPlugin = require('html-webpack-plugin')
* 3、添加模板
  ```js
  'use strict'
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        entry:{...},
        output:{...},
        module:{rules:[...]},
        plugins:[
            new HtmlWebpackPlugin({
                template:'./public/index.html' //模板
            })
        ]
    }
  ```
  