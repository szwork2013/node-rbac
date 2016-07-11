/**
 * Created by haojiachen on 2016/6/13.
 */
import cookie from 'react-cookie'
import xFetch from '../services/xFetch';
export function saveCookie(name, value) {
  //设置cookie7天有效
  cookie.save(name, value, { maxAge: 60 * 60 * 24 * 7 });
}

export function getCookie(name) {
  return cookie.load(name)
}

export function removeCookie(name) {
  cookie.remove(name)
}

export function signOut() {
  cookie.remove('token')
}

export function isLogin() {
  return !!cookie.load('token')
}

export function autoLogin(next, replace, callback) {
  //已经登录则不进入
  if (isLogin()) {
    //向服务器验证token有效性
    xFetch.post(`api/account/checkToken`).then((result)=> {
      console.log('验证成功!')
      replace('/app');
      callback();
    }).catch(()=> {
      console.log('服务器身份验证失败!!!');
      cookie.remove('token');
      callback();
    })
  } else {
    callback();
  }
}
export function requireAuth(next, replace, callback) {
  if (!isLogin()) {
    replace('/login')
  }
  callback();
}
