import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../containers/Pages/LoginPage/selectors';
import {
  ADMIN_ROLE,
  PRINCIPAL_ROLE,
  STUDENT_ROLE,
  TEACHER_ROLE,
} from './constants';

export const withLoginUser = (WrappedComponent) => {
  const withLoginUserComponent = (props) => (
    <WrappedComponent
      isAdmin={() => props.user.role === ADMIN_ROLE}
      isPrincipal={() => props.user.role === PRINCIPAL_ROLE}
      isTeacher={() => props.user.role === TEACHER_ROLE}
      isStudent={() => props.user.role === STUDENT_ROLE}
      {...props}
    />
  );
  withLoginUserComponent.propTypes = {
    user: PropTypes.object,
  };
  const mapStateToProps = createStructuredSelector({
    user: makeSelectCurrentUser(),
  });
  const mapDispatchToProps = () => ({});
  const withConnect = connect(mapStateToProps, mapDispatchToProps);
  return withConnect(withLoginUserComponent);
};
