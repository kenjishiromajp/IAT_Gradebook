/**
 *
 * GradeTableList
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row } from 'antd';
import GradeTableContainer from '../../containers/GradeTableContainer';

class GradeTableList extends Component {
  renderGradeTables = () => {
    const { courseClass } = this.props;
    return courseClass.map((cc) => (
      <div key={cc.id} style={{ marginBottom: '20px' }}>
        <Card bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
          <GradeTableContainer courseClass={cc} />
        </Card>
      </div>
    ));
  };
  render() {
    return <div className="grade-table-list">{this.renderGradeTables()}</div>;
  }
}

GradeTableList.propTypes = {
  courseClass: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default GradeTableList;
