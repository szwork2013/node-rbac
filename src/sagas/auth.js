/**
 * Created by haojiachen on 2016/6/12.
 */
import {takeLatest} from 'redux-saga';
import {take, call, put, fork, cancel} from 'redux-saga/effects';
import {loginApi, signupApi} from '../services/auth';
import {message, notification} from 'antd';
import {Types, Actions} from '../actions/auth';
import {hashHistory} from 'react-router';
import {saveCookie} from '../utils/authUtil';

function* login(actions) {
  try {
    yield put(Actions.setLoading());
    const result = yield call(loginApi, actions.user);
    if (result && result.data) {
      yield put(Actions.loginSuccess());
      // 保存cookie
      saveCookie('token', result.data.token);
      notification.success({
        message: '登录成功!',
        description: `欢迎${result.data.userName ? result.data.userName : '您使用!'}`
      });
      hashHistory.push('/app');
    }
  } catch (err) {
    message.error(err);
    yield put(Actions.loginError());
    // 测试使用
    // yield put(Actions.loginSuccess({ userName: '管理员', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiZXhwaXJlVGltZSI6IjMyNDcyMTQ0MDAwMDAwIn0.57mDiXif5IhIknPJ5ryEaZCcGm2KRS_YIubXUCsFR8o' }));
  }
}

function* signup(actions) {
  try {
    yield put(Actions.setLoading());
    const result = yield call(signupApi, actions.user);
    if (result && result.data) {
      yield put(Actions.signupSuccess());
      message.success('注册成功');
      hashHistory.push('/login');
    }
  } catch (err) {
    message.error(err);
    yield put(Actions.signupError());
  }
}

function* watchLogin() {
  yield takeLatest(Types.LOGIN_REQUEST, login);
}

function* watchSignup() {
  yield takeLatest(Types.SIGNUP_REQUEST, signup);
}

export default function* () {
  yield [fork(watchLogin)];
  yield [fork(watchSignup)];
}
