import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import './style.less';

const { Header } = Layout;

const MyHeader = ({ children }) => (
  <Header className="my-header">{children}</Header>
);
MyHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
export default MyHeader;
