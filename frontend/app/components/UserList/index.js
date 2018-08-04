/**
 *
 * UserList
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
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

const UserList = ({ users, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="user-list">
      <Table
        size="middle"
        dataSource={users}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default UserList;
