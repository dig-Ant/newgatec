const path = require('path');


export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    // 'transform-decorators-legacy',
    ["import",{ "libraryName": "antd-mobile", "style": true },"antd-mobile-import"],
    // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  env: { // 针对特定的环境进行配置 dev 环境下使用 dva-hmr
    development: {
      extraBabelPlugins: [
        'dva-hmr',
      ],
      
    },
  },
  alias: { // 别名
    components: path.resolve(__dirname, 'src/components/'),
    util: path.resolve(__dirname, 'src/utils'),
    cfg: path.resolve(__dirname, 'src/config'),
  },
  // ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸。
  // theme: './src/theme.js', // 配置主题
  html: { // 配合hash使用
    template: './src/index.ejs',
  },
  // disableDynamicImport: true,  //禁用 import() 按需加载，全部打包在一个文件里
  // publicPath: '/',
  hash: true,
  manifest: { // 生成一个 manifest.json 文件 显示源文件名的对应关系
    basePath: "/app/"
  }
};