/**
 *
 * LoadingFullPage
 *
 */

import React from 'react';
import { Spin } from 'antd';
import './style.less';

const LoadingFullPage = () => (
  <div className="loading-full-page">
    <Spin size="large" />
  </div>
);

export default LoadingFullPage;
