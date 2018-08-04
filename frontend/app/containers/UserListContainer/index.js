/**
 *
 * User List Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Pagination, Row } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectUsers,
  makeSelectUsersLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadUsers } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import UserList from '../../components/UserList';

class UserListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadUsers(currentPage, limit);
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadUsers(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadUsers = (page, limit) => {
    const offset = this.getOffset(page, limit);
    this.props.loadUsers({
      offset,
      limit,
    });
  };
  render() {
    const {
      loading, users, totalCount, limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="user">
        <LoadingCard loading={loading}>
          <UserList users={users} />
        </LoadingCard>
        <Row type="flex" justify="end">
          <Pagination
            onChange={this.onChangePage}
            pageSize={limit}
            current={currentPage}
            total={totalCount}
          />
        </Row>
      </div>
    );
  }
}

UserListContainer.propTypes = {
  error: PropTypes.object,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadUsers: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  users: makeSelectUsers(),
  loading: makeSelectUsersLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: (params) => dispatch(loadUsers(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });
export default compose(withReducer, withSaga, withConnect)(UserListContainer);
