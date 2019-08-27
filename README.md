#### 解析css
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
#### 解析less
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
 #### 解析sass
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
#### 解析图片
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
  ```
* 3、占位符
  ```js
  [ext] : 资源后缀名
  [name] : 文件名称
  [path] : 文件的相对路径
  [folder] : 文件所在的文件夹
  [contenthash] : 文件的内容hash,默认是md5生成
  [hash] : 文件内容的hash,默认是md5生成
  [emoji] : 一个随机的指代文件内容的emoji
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


