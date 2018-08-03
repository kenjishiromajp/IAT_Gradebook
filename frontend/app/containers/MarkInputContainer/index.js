/**
 *
 * MarkInput
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './style.less';
import MarkInput from '../../components/MarkInput';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';
import { createMark, editMark } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class MarkInputContainer extends Component {
  state = {
    value: this.props.value,
    loading: false,
  };
  handleChange = (value) => {
    this.setState({
      value,
    });
  };
  handleBlur = () => {
    this.setState({
      loading: true,
    });
    const createOrUpdate = !this.state.value.id
      ? this.props.createMark
      : this.props.editMark;
    createOrUpdate(this.state.value)
      .then((value) => {
        this.setState({
          loading: false,
          value,
        });
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
      />
    );
  }
}

MarkInputContainer.defaultProps = {
  onBlur: () => {},
  onCheck: () => {},
  onChange: () => {},
  value: {},
};

MarkInputContainer.propTypes = {
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
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(MarkInputContainer);
