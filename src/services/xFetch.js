import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import querystring from 'querystring';
import {notification} from 'antd';
import {hashHistory} from 'react-router';
import {signOut} from '../utils/authUtil';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    console.log('无权访问')
    signOut();
    notification.error({
      message: '无权访问',
      description: '身份已过期!4秒后自动跳转..',
      onClose: () => {
        hashHistory.push('login')
      }
    });
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  if (res.status != 200) {
    return Promise.reject(errorMessages(res));
  }
  return res.json().then(jsonResult => {
    if (jsonResult && jsonResult.isError) {
      return Promise.reject(jsonResult.message);
    } else {
      return { ...res, data: jsonResult.data || '', message: jsonResult.message };
    }
  });
}

function xFetch(url, options) {
  const opts = { ...options };

  const token = cookie.get('token') || '';

  opts.headers = {
    ...opts.headers,
    'x-auth-token': token,
    'Content-Type': 'application/json;charset=utf-8'
  };
  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .catch(function (ex) {
      throw `服务器通讯异常:${ex}`;
    })
}

/**
 * post请求 在服务器新建一个资源。
 * @param url
 * @param data
 * @param options
 */
function post(url, data, options) {
  return xFetch(url, { ...options, method: 'POST', body: JSON.stringify(data) })
}

/**
 * delete请求 从服务器删除资源。
 * @param url
 * @param options
 */
function del(url, options) {
  return xFetch(url, { ...options, method: 'DELETE' });
}

/**
 * put请求 在服务器更新资源（客户端提供改变后的完整资源）。
 * @param url
 * @param data
 * @param options
 */
function put(url, data, options) {
  return xFetch(url, { ...options, method: 'PUT', body: JSON.stringify(data) });
}
/**
 * patch请求 在服务器更新资源（客户端提供改变的属性）。
 * @param url
 * @param data
 * @param options
 */
function patch(url, data, options) {
  return xFetch(url, { ...options, method: 'PATCH', body: JSON.stringify(data) });
}

/**
 * get请求 从服务器取出资源（一项或多项）。
 * @param url
 * @param options
 */
function get(url, data, options) {
  return xFetch(`${url}${data ? '?' + querystring.stringify(data) : ''}`, { ...options, method: 'GET' });
}

export default { post, del, put, patch, get };
