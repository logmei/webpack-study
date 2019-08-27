### 常见的loaders
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
### 常用的plugins
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
### mode构建环境
* production:设置process.env.NODE_ENV的值为production,默认开启一些插件FlagDependencyUsagePlugin,FlagIncludeChunksPlugin,ModuleConcatenationPlugin,
  NoEmitOnErrorPlugin,OccurrenceOrderPlugin,SideEffectsFlagPlugin和TerserPlugin
* development：设置process.env.NODE_ENV的值为development,开启NamedChunksPlugin和NamedModulesPlugin
* none:不开启任何插件
### 添加es6解析
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
 ### 添加react jsx解析
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
### 添加html模板解析
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
  ### 解析css
> js文件引用index.css文件，使用css-loader加载.css文件后转换成commonjs对象，插入到js文件中；
> 通过style-loader，创建style标签插入到html文件中
* 1、安装 npm i style-loader css-loader -D
* 2、webpack.config.js中添加配置
  > loader的调用是链式调用，执行顺序是从右到左。所以先写style-loader在写css-loader

  > 执行时先用css-loader解析css文件转成对象，传递给style-loader插入到head

  >```注意：样式文件和引用的后缀名为.css```
  ```js
  module.exports={
      entry:{...},
      outpath:{path:...,filename:...},
      mode:'production',
      module:{
          rules:[
              {
                  test:/\.css$/,
                  use:[
                  'style-loader',
                  'css-loader'
                  ]
              },
          ]
      }
  }
  ```
### 解析less
  > less建立在css基础上，先解析less，再转为css,再插入到head
  * 1、安装 npm i less less-loader -D
  * 2、webpack.config.js中添加配置
    >```注意：样式文件和引用的后缀名为.less```
  ```js
  module.exports={
      entry:{...},
      outpath:{path:...,filename:...},
      mode:'production',
      module:{
          rules:[
              {
                  test:/\.less$/,
                  use:[
                  'style-loader',
                  'css-loader',
                  'less-loader'
                  ]
              },
          ]
      }
  }
  ```
 ### 解析sass
  > sass建立在css基础上，先解析sass，再转为css,再插入到head
  * 1、安装 npm i less less-loader node-sass -D
  * 2、webpack.config.js中添加配置
    >```注意：样式文件和引用的后缀名为.scss```
  ```js
  module.exports={
      entry:{...},
      outpath:{path:...,filename:...},
      mode:'production',
      module:{
          rules:[
              {
                  test:/\.scss$/,
                  use:[
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                  ]
              },
          ]
      }
  }
  ```
### 解析图片
> file-loader用于处理图片和字体文件
* 1、安装 npm i file-loader -D
* 2、webpack.config.js中添加配置
  ```js
  module.exports = {
      entry:{...},
      outpath:{path:...,filename:...},
      mode:'production',
      module:{
          rules:[
              {
                  test:/\.(jpg|png|gif|jpeg)$/,
                  use:'file-loader'
              }
          ]
      }
  }
  ```
> url-loader做了base64的转码，内部使用的也是file-loader
* 1、安装 npm i file-loader -D
* 2、webpack.config.js中添加配置
  ```js
  module.exports = {
      entry:{...},
      outpath:{path:...,filename:...},
      mode:'production',
      module:{
          rules:[
              {
                  test:/\.(jpg|png|gif|jpeg)$/,
                  use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240 //图片小于10k  webpack会对图片做base64，编译到js文件中
                        }
                    }
                  ]
              }
          ]
      }
  }
  ```


### 文件监听
> 文件监听是在发现文件发生变化时，自动重新构建出新的输出文件

> webpack开启监听模式，有两种方式：
* 1、启动命令：package.json中添加watch:'webpack --watch'
  ```js
    ...
    "scripts": {
        "watch": "webpack --watch"
    },
    ...
  ```
* 2、在webpack.config.js中设置
  ```js
  module.exports = {
    entry:{...},
    output:{path:...,filename:...}
    watch:true,//默认false，不开启
    watchOptions:{
        ignored:/node-modules/,//忽略，默认为空
        aggregateTimeout:300,//默认300ms,监听文件发生变化等待300ms,再去执行
        poll:1000//轮询1s默认1000次
    }
  }
  ```
  >```
  原理：轮询监听文件的编辑时间，如果发生变化，将变化了的文件记录下来存储到磁盘中，等待aggregateTimeout时间之后，将记录下来的文件一起进行构建，构建到filename指定的文件中。
  ```
### 文件热更新 webpack-dev-server
> 输出的文件存储在内存中，所以会比watch快

> 配置如下：
  * 1、安装 npm i webpack-dev-server -D
  * 2、package.json中配置开发环境下的文件热更新,其中open是构建完成之后打开浏览器
  ```js
  {
      "scripts" : {
          "dev" : "webpack-dev-server --open"
      }
  }
  ```
  * 3、webpack.config.js中添加HotModuleReplacementPlugin插件,该插件是webpack的内置插件，所以需要引入webpack ;
  * 4、webpack.config.js中添加devServer的配置
  ```js
    const webpack = require('webpack')
    module.exports = {
        plugins : [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer : {
            contentBase: './dist', //指定目录
            hot : true //开启热更新
        }
    }
  ```
### 热更新webpack-dev-middleware
   
### 不同环境配置文件
* 1、增加不同环境的配置文件webpack.dev.js(开发环境)，webpack.prod.js(生产环境)
* 2、chunkhash不能跟热更新一起使用
* 3、webpack的js文件中的mode
  ```js
  module.exports = {
    ...
    mode:'development'//'production'
    ...
  }
  ```
* 4、package.json增加一条script
  ```js
   
   {
     'scripts':{
        'build':'webpack --config webpack.prod.js',//生产环境命令
        'dev':'webpack-dev-server --config webpack.dev.js --open'//开发环境命令
     }
   }
  ```

### 文件指纹
#### Hash
> 和整个项目的构建相关，只要项目中的文件有修改，整个项目构建的hash值就会发生改变
#### Chunkhash
> 不同的entry会生成不同的chunkhash值
* 1、output中的filename增加chunkhash
```js
const path = require('path')
module.exports = {
  entry: {
    index:'./src/main.js',
    search:'./src/search.js'
  },
  output: {
    path:path.join(__dirname,'dist')
    filename:'[name][chunkhash:8].js'
  }
}
```
* 2、npm run build
* 3、如果报错,报错信息如下：
```js
  ERROR in chunk search [entry]
  [name][chunkhash:8].js
  Cannot use [chunkhash] or [contenthash] for chunk in '[name][chunkhash:8].js' (use [hash] instead)
```
> 解决办法：请把plugins下面配置的热更新插件删掉：HotModuleReplacementPlugin()

#### Contenthash
> 根据文件内容来定义hash，文件内容不变，则contenthash不变;一般css会采用contenthash，js发生变化，不会导致css重新生成

> css一般都会采用style-loader和css-loader，最终会通过style标签插入到页面上，不会生产css文件，所以需要使用MiniCssExtractPlugin插件

> MiniCssExtractPlugin.loader跟style-loader的功能是互斥的，不能同时存在
* 1、安装 npm i mini-css-extract-plugin -D
* 2、webpack添加配置
  ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    module.exports = {
      ...
      plugins:[
        new MiniCssExtractPlugin({
          filename:'[name]_[contenthash:8].css'
        })
      ],
      module:{
        rules:[
          {
            test:/\.(scss)$/,
            use:[
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      }
    }
  ```
  * 3、npm run build
  
  ##### 图片文件指纹
> file-loader用于处理图片和字体文件
* 1、安装 npm i file-loader -D
* 2、webpack.config.js中添加配置
  ```js
  module.exports = {
      entry:{...},
      outpath:{path:...,filename:...},
      mode:'production',
      module:{
          rules:[
              {
                  test:/\.(jpg|png|gif|jpeg)$/,
                  use:{
                    'file-loader',
                    options:{
                      name:'img/[name]_[hash:8].[ext]'
                    }
                  }
              }
          ]
      }
  }