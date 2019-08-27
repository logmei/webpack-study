### 代码压缩
#### html压缩
> 使用html-webpack-plugin,设置压缩参数
* 1、安装 npm i html-webpack-plugin -D
* 2、webpack.prod.js添加配置
  ```js
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports={
    ...
    plugins:[
       new HtmlWebpackPlugin({
            template:path.join(__dirname,'public/index.html'),
            filename:'index.html',//打包处理的文件名称
           // chunks:['search'],//生成html用哪些chunk
            inject:true,//打包出的js,css自动注入到html中
            minify:{
              html5:true,
              collapseWhitespace:true,
              preserveLineBreaks:false,
              minifyCSS:true,
              minifyJS:true,
              removeComments:false
            }
        }),
    ]
  }
  ```
#### css压缩
> 使用optimize-css-assets-webpack-plugin，同时使用预处理器cssnano
* 1、安装 npm i optimize-css-assets-webpack-plugin cssnano -D
* 2、webpack.prod.js添加配置
  ```js
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  module.exports = {
    ...
    plugins:[
      new OptimizeCssAssetsWebpackPlugin({
         assetNameRegExp:/\.css$/g,
          cssProcessor:require('cssnano')
      })
    ]
  }
  ```
* 3、npm run build
#### js压缩
> webpack4内置uglifyjs-webpack-plugin,生产环境会触发压缩

### 清理目录
> 使用clean-webpack-plugin
* 1、安装npm i clean-webpack-plugin -D
* 2、webpack添加配置
  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  module.exports = {
    ...
    plugins:[
      new CleanWebpackPlugin()
    ]
  }

  ```
* 3、npm run build
