import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import GradeBookPage from '../Pages/GradeBookPage/loadable';
import LandingPage from '../Pages/LandingPage/loadable';
import LoginPage from '../Pages/LoginPage/loadable';
import './fileLoads';
import './style.less';
import injectSaga from '../../utils/injectSaga';
import loginSaga from '../Pages/LoginPage/saga';
import loginReducer from '../Pages/LoginPage/reducer';
import injectReducer from '../../utils/injectReducer';
import GenericNotFound from '../../components/GenericNotFound';
import PrivateDefaultLayout from '../../layouts/PrivateDefaultLayout';
import markSaga from '../MarkInputContainer/saga';
import markReducer from '../MarkInputContainer/reducer';

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
const withGradeBookSaga = injectSaga({
  key: 'gradeBook',
  saga: markSaga,
});
const withGradeBookReducer = injectReducer({
  key: 'gradeBook',
  reducer: markReducer,
});

export default compose(
  withLoginSaga,
  withLoginReducer,
  withGradeBookSaga,
  withGradeBookReducer
)(App);
