/**
 *
 * MarkInput
 *
 */

import React, { Component } from 'react';
import { Checkbox, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import './style.less';
import InputDecimalNumber from '../InputDecimalNumber';

class MarkInput extends Component {
  handleChange = (value) => {
    this.props.onChange({
      ...this.props.value,
      value,
    });
  };
  render() {
    const { value, approved } = this.props.value;
    const { checked, loading } = this.props;
    let type = 'minus';
    let style = {};
    switch (approved) {
      case true:
        type = 'check-circle';
        style = { color: 'green' };
        break;
      case false:
        type = 'close-circle';
        style = { color: 'red' };
        break;
      default:
        type = 'minus';
        break;
    }
    return (
      <Row
        type="flex"
        gutter={15}
        align="middle"
        className="mark-input"
        style={{ flexFlow: 'row' }}
      >
        <Checkbox onCheck={this.props.onCheck} checked={checked} />
        <InputDecimalNumber
          min={0}
          onBlur={this.props.onBlur}
          onChange={this.handleChange}
          value={value}
        />
        <Icon style={style} type={type} />
        {loading && <Icon type="loading" />}
      </Row>
    );
  }
}

MarkInput.defaultProps = {
  onBlur: () => {},
  onCheck: () => {},
  onChange: () => {},
  value: {},
  loading: false,
};
MarkInput.propTypes = {
  onBlur: PropTypes.func,
  onCheck: PropTypes.func,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  loading: PropTypes.bool,
  value: PropTypes.shape({
    value: PropTypes.number,
    approved: PropTypes.bool,
  }),
};

export default MarkInput;
