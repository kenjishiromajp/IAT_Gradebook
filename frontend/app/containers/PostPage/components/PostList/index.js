/**
 *
 * PostList
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

const PostList = ({ posts, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="post-list">
      <Table
        size="middle"
        dataSource={posts.map((post) => ({
          ...post,
          key: post.id,
          rowKey: post.id,
        }))}
        columns={columns}
      />
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default PostList;
