/**
 *
 * GradeTableList
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row } from 'antd';
import GradeTable from '../GradeTable';

class GradeTableList extends Component {
  renderGradeTables = () => {
    const { courseClass } = this.props;
    return courseClass.map((cc) => (
      <div key={cc.id}>
        <Row type="flex" justify="space-between" align="bottom">
          <h3>{cc.name}</h3>
          <Row type="flex" gutter={20}>
            <div>
              <h4>START DATE:</h4>
              <h5>{cc.startDate.format('DD/MM/YYYY')}</h5>
            </div>
            <div>
              <h4>END DATE:</h4>
              <h5>{cc.endDate.format('DD/MM/YYYY')}</h5>
            </div>
          </Row>
        </Row>
        <Card>
          <GradeTable courseClass={cc} />
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
