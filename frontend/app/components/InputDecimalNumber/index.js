/**
 *
 * InputDecimalNumber
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import './style.less';
import { formatToDecimal, parseToDecimal } from '../../utils/formatNumber';

class InputDecimalNumber extends React.Component {
  handleFormatter = (value) =>
    formatToDecimal(value, this.props.numberDecimals);
  handleParser = (value) => parseToDecimal(value, this.props.numberDecimals);
  render() {
    return (
      <InputNumber
        formatter={this.handleFormatter}
        parser={this.handleParser}
        min={0}
        className="input-decimal-number"
        {...this.props}
      />
    );
  }
}

export default InputDecimalNumber;

InputDecimalNumber.propTypes = {
  min: PropTypes.number,
  numberDecimals: PropTypes.number,
};
InputDecimalNumber.defaultProps = {
  numberDecimals: 2,
};
