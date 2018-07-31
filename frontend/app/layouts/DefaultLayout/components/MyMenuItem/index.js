/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

const MyMenuItem = ({ to, icon, title }) => (
  <Link to={to}>
    {typeof icon === 'string' ? <Icon type={icon} /> : icon}
    <span>{title}</span>
  </Link>
);
MyMenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
};
export default MyMenuItem;
