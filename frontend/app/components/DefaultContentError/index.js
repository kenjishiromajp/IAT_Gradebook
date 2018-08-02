/**
 *
 * DefaultContentError
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { MESAGE_STATUS_CODE } from '../../layouts/DefaultLayout/constants';

const DefaultContentError = ({ error }) => (
  <div className="default-content-error">
    <div className="content">
      <h1 className="status-code">{error.response.status}</h1>
      <h3 className="message-status-code">
        {MESAGE_STATUS_CODE[error.response.status]}
      </h3>
    </div>
  </div>
);

DefaultContentError.propTypes = {
  error: PropTypes.object.isRequired,
};

export default DefaultContentError;
