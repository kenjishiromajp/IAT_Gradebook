/**
 *
 * GradeTable
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
import './style.less';
import MarkInputContainer from '../../containers/MarkInputContainer';
import { API_URL } from '../../utils/constants';
import { getRequest, requestDownload } from '../../utils/request';

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

  downloadExcel = (url) => {
    requestDownload(url, `gradebook_${this.props.courseClass.id}`);
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
        [current.task_id]: { ...current },
      }),
      {}
    );
    const marksByTasksCell = this.getAllTasks().map((task) => {
      const mark = marksByTask[task.id]
        ? marksByTask[task.id]
        : {
          task_id: task.id,
          student_id: student.id,
          class_id: this.props.courseClass.id,
          approved: null,
        };
      if (isNaN(task.id)) {
        return <th key={task.id}>-</th>;
      }
      const checked = this.props.checkedMarks.includes(mark.id);
      return (
        <th key={JSON.stringify(mark)}>
          <MarkInputContainer
            canCheck={this.props.canCheck}
            checked={checked}
            onCheck={this.props.markCheck}
            value={mark}
            max={task.totalMark}
          />
        </th>
      );
    });
    return marksByTasksCell;
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
    const { courseClass, canDownload } = this.props;
    return (
      <div className="grade-table">
        <Row
          type="flex"
          align="middle"
          gutter={20}
          style={{
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: '20px',
            paddingBottom: '10px',
          }}
        >
          <h3>{courseClass.name}</h3>
          <div>
            <Row type="flex" gutter={5} className="grade-table-dates">
              <h5>{courseClass.startDate.format('DD/MM/YYYY')}</h5>
              <span>~</span>
              <h5>{courseClass.endDate.format('DD/MM/YYYY')}</h5>
            </Row>
          </div>
          {canDownload && (
            <Button
              size="small"
              onClick={() =>
                this.downloadExcel(`${API_URL}/gradebooks/${this.props.courseClass.id}/download`)
              }
            >
              Download Excel
            </Button>
          )}
        </Row>
        <table>
          <thead>
            <tr role="row">{this.renderSubjects()}</tr>
            <tr role="row">{this.renderTasks()}</tr>
          </thead>
          <tbody>{this.renderStudents()}</tbody>
        </table>
      </div>
    );
  }
}

GradeTable.defaultProps = {
  markCheck: () => {},
  checkedMarks: [],
  canCheck: true,
  canDownload: true,
};
GradeTable.propTypes = {
  canDownload: PropTypes.bool,
  canCheck: PropTypes.bool,
  checkedMarks: PropTypes.array,
  markCheck: PropTypes.func,
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
