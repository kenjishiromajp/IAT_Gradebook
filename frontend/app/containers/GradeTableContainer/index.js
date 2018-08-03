/**
 *
 * GradeTableContainer
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import GradeTable from '../../components/GradeTable';

class GradeTableContainer extends Component {
  state = {
    marks: {},
  };
  handleMarkBlur = () => {};
  handleMarkCheck = () => {};
  render() {
    return (
      <GradeTable
        {...this.props}
        markBlur={this.handleMarkBlur}
        markCheck={this.handleMarkCheck}
        markChange={this.handleMarkChange}
      />
    );
  }
}

GradeTableContainer.propTypes = {
  courseClass: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    students: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      email: PropTypes.string,
      marks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        task_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        approved: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        correctionPercentage: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })),
      totalMarksCorrectionPercentage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })).isRequired,
    subjects: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        markWeightAverage: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        totalMark: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })),
    })),
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
  }).isRequired,
  actionColumn: PropTypes.func,
};

export default GradeTableContainer;
