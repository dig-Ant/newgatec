import { delay } from 'roadhog-api-doc';
import users, { user, cst_list } from "./mock/user";

// ger_plat_user_customers 企业列表
// ger_plat_user_auth 功能列表
// get_certificate_info 查询证件信息
// 原来的验证接口 身份验证扩展
// get_collect_mod 获取表单
//                 填写表单上传图片
// save_collect_draft 保存草稿
// get_collect_draft 获取草稿
// submit_collect_info 提交表单


const noProxy = process.env.NO_PROXY === 'true';
const proxy = {
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    const isOk = password === '888888' && username === 'admin';
    res.send({ status: isOk ? 'ok' : 'error', type: 'account' });
  },
  'GET /api/user': user,

  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // 获取企业列表 
  'GET /api/ger_plat_user_customers': cst_list,

  // 获取功能列表
  'GET /api/ger_plat_user_auth': users.feature_list,

  // 查询证件信息 
  'GET /api/get_certificate_info': users.certificate_info,

  // 原来的验证接口 身份验证扩展 
  'POST /api/validate_user': users.validate_user,

  // 获取表单 
  'GET /api/get_collect_mod': users.collect_mod,

  // 填写表单上传图片 (空)

  // 保存草稿 
  'POST /api/save_collect_draft': users.save_collect_draft,

  // 获取草稿 
  'GET /api/get_collect_draft': users.get_collect_draft,

  // 提交表单 
  'POST /api/submit_collect_info': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },

  // GET POST 可省略
  // '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  // 'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward 到另一个服务器
  // 'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  // 'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};

export default noProxy ? {
  // '/api/(.*)': "https://your.server.com/api/",
  // '/api/*': "https://your.server.com/",
} : delay(proxy, 1000);