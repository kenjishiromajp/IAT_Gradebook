/**
 *
 * LoadingCard
 *
 */

import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

const LoadingCard = ({
  loading, children, className, ...restProps
}) => (
  <Card
    {...restProps}
    loading={loading}
    className={`card-no-padding card-no-border card-no-background ${className}`}
  >
    {loading ? '' : children}
  </Card>
);

LoadingCard.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default LoadingCard;
