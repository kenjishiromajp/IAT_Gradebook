import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import DefaultLayout from '../DefaultLayout';
import { makeSelectCurrentUser } from '../../containers/LoginPage/selectors';
import { isValidUser, checkInvalidRole } from '../../utils/authentication';

const PrivateDefaultLayout = ({
  user,
  notAllowedRoles,
  component: Component,
  ...rest
}) => {
  if (!isValidUser(user)) {
    return <Redirect to="/login" />;
  }
  if (notAllowedRoles && checkInvalidRole(user.role, notAllowedRoles)) {
    return <Redirect to="/" />;
  }
  return <DefaultLayout {...rest} component={Component} />;
};

PrivateDefaultLayout.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  notAllowedRoles: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(PrivateDefaultLayout);
