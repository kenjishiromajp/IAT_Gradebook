import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../containers/LoginPage/selectors';

export const withLoginUser = (WrappedComponent) => {
  const withLoginUserComponent = (props) => (
    <WrappedComponent
      isAdmin={() => props.user.role === 'admin'}
      isRoot={() => props.user.role === 'root'}
      isUser={() => props.user.role === 'user'}
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
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );
  return withConnect(withLoginUserComponent);
};
