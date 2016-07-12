import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link, IndexRedirect} from 'react-router';
import {autoLogin, requireAuth} from '../utils/authUtil';

import App from '../components/App';
import NotFound from '../components/NotFound';
import {Login, SignUp} from '../components/Account';
import Home from '../components/Home'

const Routes = ({history}) =>
  <Router history={history}>
    <Route path="/">
      <IndexRedirect to="login"/>
      <Route breadcrumbName="首页" path="app" component={App}>
        <IndexRoute component={Home}/>
        <Route breadcrumbName="首页" path="home" component={Home}/>
      </Route>
      <Route path="login" component={Login} onEnter={autoLogin}/>
      <Route path="signup" component={SignUp}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
