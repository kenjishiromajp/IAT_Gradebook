/**
 *
 * GradeTable
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class GradeTable extends Component {
  renderTasks = () => {
    const { courseClass: { subjects } } = this.props;
    const tasks = subjects.reduce((accumultator, current) => {
      let { tasks: subjectTasks } = current;
      if (!subjectTasks.length) {
        subjectTasks = [{ id: `empty-subject-${current.id}`, name: '' }];
      }
      return [...accumultator, ...subjectTasks];
    }, []);
    const tasksCells = tasks.map((task) => <td key={task.id}>{task.name}</td>);
    return [<td className="compensation-cell" />, ...tasksCells];
  };

  renderSubjects = () => {
    const { courseClass: { subjects } } = this.props;
    const subjectsCells = subjects.map((subject) => (
      <th
        colSpan={subject.tasks.length ? subject.tasks.length : 1}
        key={subject.id}
      >
        {subject.name}
      </th>
    ));
    return [<td className="compensation-cell" />, subjectsCells];
  };

  renderMarksByStudent = (student) => {
    const marks = student.marks;
    return marks.map((mark) => <th>{mark.value}</th>);
  };

  renderStudents = () => {
    const { courseClass: { students } } = this.props;
    return students.map((student) => (
      <tr>
        <th className="student-name-cell">{student.name}</th>
        {this.renderMarksByStudent(student)}
      </tr>
    ));
  };

  render() {
    return (
      <table className="grade-table">
        <thead>
          <tr role="row">{this.renderSubjects()}</tr>
          <tr role="row">{this.renderTasks()}</tr>
        </thead>
        <tbody>{this.renderStudents()}</tbody>
      </table>
    );
  }
}

GradeTable.propTypes = {
  courseClass: PropTypes.shape({
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
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  actionColumn: PropTypes.func,
};

export default GradeTable;
