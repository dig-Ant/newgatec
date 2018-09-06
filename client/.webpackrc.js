const path = require('path');
const pxtorem = require('postcss-pxtorem');

export default {
  entry: 'src/index.js',
  // devtool: "source-map",
  extraPostCSSPlugins: [ //引入postcss-pxtorem 吧xp自动转化成rem,获取当前手机屏幕宽度设置
    pxtorem({
      rootValue: 37.5, //对根元素大小进行设置
      // 忽略border和font-size相关属性
      propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
      // propWhiteList: [],
      unitPrecision: 5, //转换成rem后保留的小数点位数
      // selectorBlackList: [],
      // replace: true,
      // mediaQuery: false,
      // minPixelValue: 12//所有小于12px的样式都不被转换
    })
  ],
  extraBabelPlugins: [
    // 'transform-decorators-legacy',
    ["import", { "libraryName": "antd-mobile", "style": true }, "antd-mobile-import"],
    // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  env: { // 针对特定的环境进行配置 dev 环境下使用 dva-hmr
    development: {
      extraBabelPlugins: [
        'dva-hmr',
      ],

    },
  },
  "proxy": {
    // "/api": {
    //   "target": "http://your.service.com/",   //代理后转发规则（api）会拼接在url后边
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api": "" }
    // },

    // "/api": {
    //   "target": "http://localhost:31001/",
    //   "changeOrigin": true,
    //   "pathRewrite": /*  */{ "^/api": "" }//把api去掉
    // }
  },
  alias: { // 别名
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils'),
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