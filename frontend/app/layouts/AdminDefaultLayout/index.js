import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import DefaultLayout from '../DefaultLayout';
import { makeSelectCurrentUser } from '../../containers/LoginPage/selectors';
import { isValidUser } from '../../utils/authentication';

const AdminDefaultLayout = ({ user, component: Component, ...rest }) => {
  if (!isValidUser(user)) {
    return <Redirect to="/login" />;
  }
  if (user.role === 'user') {
    return <Redirect to="/" />;
  }
  return <DefaultLayout {...rest} component={Component} />;
};

AdminDefaultLayout.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(AdminDefaultLayout);
