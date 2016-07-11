/**
 * Created by haojiachen on 2016/6/12.
 */

export const Types = {
  LOADING: 'LOGIN_LOADING',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',

  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
};

export const Actions = {
  setLoading() {
    return {
      type: Types.LOADING
    }
  },
  login(user) {
    return {
      type: Types.LOGIN_REQUEST,
      user: user
    };
  },
  loginSuccess() {
    return {
      type: Types.LOGIN_SUCCESS
    };
  },
  loginError() {
    return {
      type: Types.LOGIN_ERROR
    };
  },

  signup(user) {
    return {
      type: Types.SIGNUP_REQUEST,
      user: user
    };
  },
  signupSuccess() {
    return {
      type: Types.SIGNUP_SUCCESS
    };
  },
  signupError() {
    return {
      type: Types.SIGNUP_ERROR
    };
  },
}
