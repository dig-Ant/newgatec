'use strict';



//注入自行实现的方法级别的权限判定
function aopPermission(app) {
  var remotes = app.remotes();
  remotes.before('**', function (ctx, next) {
    //在每个remoteMethod中定义mcode字段为操作的名字，此处可以判断用户的权限
    if (ctx && ctx.method && ctx.method.mcode) {
      if (ctx.req.accessToken && ctx.req.accessToken.userId) {  //用户有token
        var SysUser = app.models.SysUser;
        //todo：if the user has the permission, call next(), otherwise call next(error);
      }
    }
    next();
  });
}

//Model的辅助类
const ModelHelper = {};

//移除默认暴露的api接口
ModelHelper.disableAllDefaultApis = function (model) {
  let methods = ['create', 'replaceOrCreate', 'patchOrCreate', 'exists', 'findById', 'find', 'findOne',
    'destroyById', 'count', 'replaceById', 'prototype.patchAttributes', 'createChangeStream', 'updateAll',
    'replaceOrCreate', 'replaceById', 'upsertWithWhere']
  methods.forEach(it => model.disableRemoteMethodByName(it));
}

//移除系统默认暴露的api接口
function disableAllDefaultApis(app) {
  var models = app.models();
  for (var i = 0; i < models.length; i++) {
    ModelHelper.disableAllDefaultApis(models[i]);

  }
  // sys.lib.log.trace("Remove the system default api exposed!");
}

// function setMenu(app) {
//   let api = app.models.WxSvc.getApi();
//   console.log('api---', api);
//   let menuObj = {
//     "button": [
//       {
//         "type": "click",
//         "name": "急速入口",
//         "sub_button": [
//           {
//             "type": "view",
//             "name": "自动入职",
//             "url": "http://www.soso.com/"
//           },
//           {
//             "type": "view",
//             "name": "补全材料",
//             "url": "http://www.soso.com/"
//           },
//           {
//             "type": "view",
//             "name": "一件报销",
//             "url": "http://www.soso.com/"
//           },
//           {
//             "type": "click",
//             "name": "打卡",
//             "key": "V1001_GOOD"
//           }]
//       },
//       {
//         "type": "click",
//         "name": "服务中心",
//         "url": "V1001_TODAY_MUSIC"
//       },
//       {
//         "name": "才赋有礼",
//         "sub_button": [
//           {
//             "type": "view",
//             "name": "礼卡兑换",
//             "url": "http://www.soso.com/"
//           },
//           {
//             "type": "click",
//             "name": "才赋渊源",
//             "key": "V1001_GOOD"
//           }]
//       }]
//   }
//   api.createMenu(menu, ()=> {});
// }

module.exports = async function (app) {
  disableAllDefaultApis(app);
  aopPermission(app);
  // setMenu(app);

};