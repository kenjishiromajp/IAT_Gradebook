/**
 *
 * GradeTable
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import MarkInputContainer from '../../containers/MarkInputContainer';

class GradeTable extends Component {
  getAllTasks = () => {
    const { courseClass: { subjects } } = this.props;
    return subjects.reduce((accumultator, current) => {
      let { tasks: subjectTasks } = current;
      if (!subjectTasks.length) {
        subjectTasks = [
          { id: `empty-subject-${current.id}`, type: 'empty', name: '' },
        ];
      }
      return [...accumultator, ...subjectTasks];
    }, []);
  };
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
    return [<td key={0} className="compensation-cell" />, ...tasksCells];
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
    return [<td key={0} className="compensation-cell" />, subjectsCells];
  };

  renderMarksByStudent = ({ marks, ...student }) => {
    const marksByTask = marks.reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current.task_id]: { ...current, approved: !!current.approved },
      }),
      {}
    );
    return this.getAllTasks().map((task) => {
      const mark = marksByTask[task.id]
        ? marksByTask[task.id]
        : {
          task_id: task.id,
          student_id: student.id,
          class_id: this.props.courseClass.id,
          approved: null,
        };
      return (
        <th key={task.id}>
          <MarkInputContainer
            onBlur={this.props.markBlur}
            onCheck={this.props.markCheck}
            onChange={this.props.markChange}
            value={mark}
          />
        </th>
      );
    });
  };

  renderStudents = () => {
    const { courseClass: { students } } = this.props;
    return students.map((student) => (
      <tr key={student.id}>
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

GradeTable.defaultProps = {
  markBlur: () => {},
  markCheck: () => {},
  markChange: () => {},
};
GradeTable.propTypes = {
  markBlur: PropTypes.func,
  markCheck: PropTypes.func,
  markChange: PropTypes.func,
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

export default GradeTable;
