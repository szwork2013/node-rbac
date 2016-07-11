import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import { Login, SignUp } from '../components/Account';
import {autoLogin, requireAuth} from '../utils/authUtil';

const Routes = ({ history }) =>
  <Router history={history}>

    <Route path="/">
      <IndexRedirect to="login" />
      <Route path="app" component={App} />
      <Route path="actived" component={App} />
      <Route path="completed" component={App} />
      <Route path="login" component={Login} onEnter={autoLogin} />
      <Route path="signup" component={SignUp} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
