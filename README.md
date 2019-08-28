### css3增强功能
#### 自动补齐css3前缀
> 使用 postcss-loader

> 使用后置处理器(代码生成完成之后更改)autoprefixer插件（根据Can I Use 规则 https://caniuse.com）
* 1、安装 npm i postcss-loader autoprefixer -D
* 2、webpack配置 https://github.com/postcss/autoprefixer
  ```js
  module.exports={
    module:{
      rules:[
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      ]
    }
  }
  ```
* 3、新建postcss.config.js文件
  ```js
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
 }
  ```
 * 4、package.json中添加浏览器支持版本的配置
  > https://github.com/browserslist/browserslist#readme
  ```js
   "browserslist": [
    "last 1 version",
    "> 1%",
    "IE 10"
  ]
  ```
  * 5、npm run build
#### px自动转换成rem
> 使用px2rem-loader：对px和rem的转换；
> 
> 页面渲染时需要知道根元素的font-size值:使用手淘的库[lib-flexible](https://github.com/amfe/lib-flexible)
* 1、安装 
  > a、npm i px2rem-loader -D (开发时使用)

  > b、npm i lib-flexible -S （依赖包）
* 2、webpack添加配置
  ```js
  module.exports = {
    ...
    module:{
      rules:[{
        test:/\.scss$/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader:'px2rem-loader',
            options:{
              remUnit:75,
              remPrecision:8
            }
          }
        ]
      }]
    }
  }
  ```
* 3、页面加载时需要计算根元素的font-size,所以lib-flexible的引用需要前置
  > 在生成的html中加入lib-flexible的代码

### 资源内联
#### 代码层面
##### 1、初始化脚本或内联html
  > 如果存在es6代码需要增加babel-loader,进行转换
  * 安装 npm i raw-loader@0.5.1 -D
  >  ${require('...')}读取出内容，然后进行插入
  * raw-loader 内联html
  ```${require('raw-loader!./meta.html')}```
  * raw-loader 内联js
  > 如:lib-flexible，在页面加载时，需要嵌入到html中
  ```<script>$(require('raw-loader!babel-loader!./node_modules/lib-flexible'))</script>```
##### 2、上报点：js/css的加载中、加载完成
##### 3、css内联：
  > 如：首屏的样式内联入html中，防止页面闪动
  * 借助style-loader 的singleton:true//将所有style标签合并成一个
  ```js
  module.exports = {
    module:{
      rules: [
        {
          test:/\.scss$/,
          use:[
            {
              loader:'style-loader',
              options:{
                insertAt:'top',//样式插入到<head>
                singleton:true//将所有的style标签合并成一个
              },
              'css-loader',
              'sass-loader'
            }
          ]
        }
      ]
    }
  }
  ```
  * html-inline-css-webpack-plugin
  

#### 请求层面：减少HTTP网络请求数
* 1、小图片或者字体内联进页面（使用url-loader，设置limit）
  
