import xFetch from './xFetch';

export async function loginApi(user) {
  return xFetch.post('api/account/login', user);
}

export async function signupApi(user) {
  return xFetch.post('api/account/signup', user);
}
