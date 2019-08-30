const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function setMPA(){
  const entryFiles = require.context('./mpa',true,/.*\/mpa\/(\w+)\/index\.js$/)
  const entry = {}
  const htmlWebpackPlugins = []
  entryFiles.keys().forEach(key=>{
    const name = key.replace(/.*\/mpa\/(\w+)\/index\.js$/,'$1')
    entry[name] = `./src/mpa/${name}/index.js`
    htmlWebpackPlugins.push(getHtmlWebpackPlugin(name))
  })
  return {entry,htmlWebpackPlugins}
}
function getHtmlWebpackPlugin(name){
  return new HtmlWebpackPlugin({
    template: path.join(__dirname,`public/${name}.html`),//模板名
    filename: `${name}.html`,//html文件名
    inject: true,//true:[Boolean]默认值，script标签位于html文件的body底部；body:[String]与true功能一样；head:[String]，script标签位于html的head中；false：不插入生成的js文件
    //favicon: 'path/to/my_favicon.ico'
    minify:{//对html文件进行压缩
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false
    }
  })
}
module.exports = {entry,htmlWebpackPlugins} = setMPA()