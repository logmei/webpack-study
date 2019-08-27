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