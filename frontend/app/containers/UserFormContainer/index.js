/**
 *
 * User Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import reducer from './reducer';

import UserForm from '../../components/UserForm';

import {
  makeSelectError,
  makeSelectUserLoading,
  makeSelectSuccess,
} from './selectors';
import { createUser, editUser } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

class UserFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      this.props.onSucces(success);
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (userValues) => {
    const { user } = this.props;
    if (user && user.id) {
      return this.props.editUser(userValues);
    }
    return this.props.createUser(userValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { error, success, ...restProps } = this.props;
    return (
      <UserForm
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

UserFormContainer.propTypes = {
  onSucces: () => {},
  onCancel: () => {},
};

UserFormContainer.propTypes = {
  onSucces: PropTypes.func,
  onCancel: PropTypes.func,
  editUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    roleId: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectUserLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editUser: (user) => dispatch(editUser(user)),
  createUser: (user) => dispatch(createUser(user)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'userForm', reducer });
const withSaga = injectSaga({ key: 'userForm', saga });
export default compose(withReducer, withSaga, withConnect)(UserFormContainer);
