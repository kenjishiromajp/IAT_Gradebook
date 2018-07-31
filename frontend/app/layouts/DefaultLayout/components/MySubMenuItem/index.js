import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const MySubMenuItem = ({ icon, title }) => (
  <span>
    <Icon type={icon} />
    <span>{title}</span>
  </span>
);
MySubMenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default MySubMenuItem;
