import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import './fileLoads';
import './style.less';

import injectSaga from '../../utils/injectSaga';

import PostPage from '../PostPage/loadable';
import ContactPage from '../ContactPage/loadable';
import LoginPage from '../LoginPage/loadable';

import DefaultLayout from '../../layouts/DefaultLayout/index';
import PrivateDefaultLayout from '../../layouts/PrivateDefaultLayout/index';

import saga from './saga';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <DefaultLayout exact path="/contact" component={ContactPage} />
        <PrivateDefaultLayout exact path="/" component={PostPage} />
      </Switch>
    );
  }
}

const withSaga = injectSaga({ key: 'global', saga });
export default compose(withSaga)(App);
