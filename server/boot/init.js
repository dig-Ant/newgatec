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


//移除系统默认暴露的api接口
function disableAllDefaultApis(app) {
  var models = app.models();
  for (var i = 0; i < models.length; i++) {
    sys.helper.modelHelper.disableAllDefaultApis(models[i]);
  }
  sys.lib.log.trace("Remove the system default api exposed!");
}


module.exports = async function (app) {
  disableAllDefaultApis(app);
  aopPermission(app);
  
};