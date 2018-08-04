/**
 *
 * MarkInput
 *
 */

import React, { Component } from 'react';
import { Checkbox, Icon, Row, Tooltip } from 'antd';
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
  handleCheck = ({ target: { checked } }) => {
    this.props.onCheck(this.props.value, checked);
  };
  renderIcon = () => {
    const { value: { approved, description } } = this.props;
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
    if (description && description.length) {
      return (
        <Tooltip placement="topLeft" title={description}>
          <div style={{ padding: '0 7px' }}>
            <Icon style={style} type={type} />
          </div>
        </Tooltip>
      );
    }
    return <Icon style={style} type={type} />;
  };
  render() {
    const {
      checked,
      loading,
      value: mark,
      canCheck,
      onBlur,
      readOnly,
      ...restProps
    } = this.props;
    const { value } = mark;

    return (
      <Row
        type="flex"
        gutter={15}
        align="middle"
        className="mark-input"
        style={{ flexFlow: 'row' }}
      >
        {mark.id &&
          canCheck && (
            <Checkbox onChange={this.handleCheck} checked={checked} />
          )}
        {readOnly ? (
          <h3>{value}</h3>
        ) : (
          <InputDecimalNumber
            {...restProps}
            onBlur={onBlur}
            min={0}
            onChange={this.handleChange}
            value={value}
          />
        )}
        {this.renderIcon()}
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
  checked: false,
  canCheck: true,
  readOnly: false,
};
MarkInput.propTypes = {
  readOnly: PropTypes.bool,
  canCheck: PropTypes.bool,
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
