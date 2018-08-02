/**
 *
 * Course Class List
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
  makeSelectCourseClass,
  makeSelectCourseClassLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadCourseClass } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import CourseClassList from '../../components/CourseClassList';

class CourseClassListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadCourseClass(currentPage, limit);
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
    this.loadCourseClass(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadCourseClass = (page, limit) => {
    const offset = this.getOffset(page, limit);
    this.props.loadCourseClass({
      offset,
      limit,
    });
  };
  render() {
    const {
      loading,
      courseClass,
      totalCount,
      limit,
      component: ListComponent,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="course-class">
        <LoadingCard loading={loading}>
          <ListComponent courseClass={courseClass} />
        </LoadingCard>
        <Row type="flex" justify="end">
          <Pagination
            onChange={this.onChangeRangeDate}
            pageSize={limit}
            current={currentPage}
            total={totalCount}
          />
        </Row>
      </div>
    );
  }
}

CourseClassListContainer.defaultProps = {
  component: CourseClassList,
};

CourseClassListContainer.propTypes = {
  error: PropTypes.object,
  component: PropTypes.func,
  courseClass: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCourseClass: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  courseClass: makeSelectCourseClass(),
  loading: makeSelectCourseClassLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadCourseClass: (params) => dispatch(loadCourseClass(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'courseClass', reducer });
const withSaga = injectSaga({ key: 'courseClass', saga });
export default compose(withReducer, withSaga, withConnect)(CourseClassListContainer);
