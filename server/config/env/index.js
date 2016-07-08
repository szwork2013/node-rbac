/**
 * Created by haojiachen on 2016/7/8.
 */

const path = require('path');
const _ = require('lodash');
const fs = require('fs');

var all = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,
  //MySQL 配置
  mysql: {
    database: 'nodeweb',
    username: 'root',
    password: 'unitech'
  },
  //redis 配置
  redis: {
    port: 6379
  },
  //session 配置
  session: {
    secrets: 'adam-secret'
  },
  //权限配置
  auth: {
    excludeUrl: [
      '/login',
      '/api/auth/checkToken',
      '/api/auth/login'
    ]
  }
};

var config = _.merge(all, require('./' + all.env + '.js') || {});

//加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {});
}

module.exports = config;
