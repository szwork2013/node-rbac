/**
 * Created by haojiachen on 2016/6/12.
 */
import {handleActions} from 'redux-actions';
import {Types} from '../actions/auth';

const auth = handleActions({
  //载入中
  [Types.LOADING](state) {
    return { ...state, loading: true };
  },
  [Types.LOGIN_SUCCESS](state) {
    return { ...state, loading: false };
  },
  [Types.LOGIN_ERROR](state) {
    return { ...state, loading: false };
  },
  [Types.SIGNUP_SUCCESS](state) {
    return { ...state, loading: false };
  },
  [Types.SIGNUP_ERROR](state) {
    return { ...state, loading: false };
  },
}, {
  loading: false
});
export default auth;
