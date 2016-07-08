/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';
//路由
module.exports = function (app) {

  //用户管理
  app.use('/api/user', require('./api/user'));

  //未拦截的请求
  app.use('/*', function (req, res, next) {
    return res.send(404);
  })
};
