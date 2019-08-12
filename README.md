#### 文件监听
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
#### 文件热更新 webpack-dev-server
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
#### 热更新webpack-dev-middleware
   