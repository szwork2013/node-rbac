/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

const Redis = require('ioredis');
const config = require('./../config/env/');
const logger = require('../util/logs');
const client = new Redis(config.redis);

client.on('error', function (err) {
  logger.error('redis error', err)
});

client.on('connect', function () {
  console.log('Redis is ready');
});

exports = module.exports = client;
