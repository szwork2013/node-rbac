/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const path = require('path');
const fs = require('fs');
const config = require('./config/env');
const errorHandler = require('errorhandler');

// 数据库
const models = require('./model');

// 初始化数据
// if (config.seedDB) {
//   require('./config/seed');
// }

var app = express();

require('./util/redis');
require('./config/express')(app);
require('./routes')(app);

if ('development' === config.env) {
  app.use(errorHandler());
} else {
  app.use(function (err, req, res, next) {
    return res.status(500).send();
  });
}

//启动数据库连接
models.sequelize.sync().then(() => {
  //web服务
  app.listen(config.port, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
});

exports = module.exports = app;
