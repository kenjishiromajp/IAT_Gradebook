/**
 *
 * CourseClassList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    // {
    //   title: 'Subjects',
    //   dataIndex: 'subjects',
    //   key: 'subjects',
    // },
    // {
    //   title: 'Students',
    //   dataIndex: 'students',
    //   key: 'students',
    // },
  ];
  if (actionColumn) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: actionColumn,
    });
  }
  return columns;
};

const CourseClassList = ({ courseClass, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="courseClass-list">
      <Table
        size="middle"
        dataSource={courseClass}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

CourseClassList.propTypes = {
  courseClass: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default CourseClassList;
