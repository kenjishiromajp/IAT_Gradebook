import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import GradeBookPage from '../GradeBookPage/loadable';
import LandingPage from '../LandingPage/loadable';
import LoginPage from '../LoginPage/loadable';
import './fileLoads';
import './style.less';
import injectSaga from '../../utils/injectSaga';
import loginSaga from '../LoginPage/saga';
import loginReducer from '../LoginPage/reducer';
import injectReducer from '../../utils/injectReducer';
import GenericNotFound from '../../components/GenericNotFound';
import PrivateDefaultLayout from '../../layouts/PrivateDefaultLayout';

const App = () => (
  <Switch>
    <PrivateDefaultLayout exact path="/" component={LandingPage} />
    <PrivateDefaultLayout exact path="/gradebook" component={GradeBookPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route component={GenericNotFound} />
  </Switch>
);

const withLoginSaga = injectSaga({
  key: 'login',
  saga: loginSaga,
});
const withLoginReducer = injectReducer({
  key: 'login',
  reducer: loginReducer,
});

export default compose(withLoginSaga, withLoginReducer)(App);
