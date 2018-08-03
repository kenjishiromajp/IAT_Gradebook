/**
 *
 * MarkInput
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './style.less';
import MarkInput from '../../components/MarkInput';
import { createMark, editMark } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import { withLoginUser } from '../../utils/withLoginUser';
import { loadCourseClassSilently } from '../CourseClassListContainer/actions';

class MarkInputContainer extends Component {
  state = {
    value: this.props.value,
    loading: false,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
  };
  handleBlur = () => {
    if (this.props.value.value === this.state.value.value) {
      return;
    }
    this.setState({
      loading: true,
    });
    const createOrUpdate = !this.state.value.id
      ? this.props.createMark
      : this.props.editMark;
    createOrUpdate(this.state.value)
      .then((value) => {
        this.props.loadCourseClass();
        this.setState({ loading: false });
      })
      .catch((error) => {
        openNotificationWithIcon('error', error.message);
        this.setState({
          value: this.props.value,
          loading: false,
        });
      });
  };
  render() {
    const { value, loading } = this.state;
    return (
      <MarkInput
        {...this.props}
        value={value}
        loading={loading}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        readOnly={this.props.isStudent()}
      />
    );
  }
}

MarkInputContainer.defaultProps = {
  value: {},
};

MarkInputContainer.propTypes = {
  loadCourseClass: PropTypes.func.isRequired,
  createMark: PropTypes.func.isRequired,
  editMark: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    approved: PropTypes.bool,
  }),
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  createMark: (mark) =>
    new Promise((resolve, reject) => {
      dispatch(createMark(mark, resolve, reject));
    }),
  editMark: (mark) =>
    new Promise((resolve, reject) => {
      dispatch(editMark(mark, resolve, reject));
    }),
  loadCourseClass: () => {
    dispatch(loadCourseClassSilently());
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withLoginUser)(MarkInputContainer);
