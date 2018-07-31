import React, { Component } from 'react';
import { Card, Icon, Row, notification, Button, Table, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectPosts,
  makeSelectPostsLoading,
} from './selectors';
import { loadPosts, removePost } from './actions';

import PostCreateButton from './components/PostCreateButton';
import PostEditButton from './components/PostEditButton';
import PostList from './components/PostList';

const { confirm } = Modal;

class PostPage extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }
  componentDidUpdate() {
    if (!this.props.error) {
      return;
    }
    notification.open({
      message: 'Error',
      description: this.props.error.toString(),
      icon: <Icon type="frown-o" style={{ color: '#FF0000' }} />,
    });
  }
  removePost = (post) => {
    confirm({
      okText: 'Yes',
      okType: 'danger',
      title: (
        <span>
          Do you want to delete -{' '}
          <strong>
            #{post.id} {post.title}
          </strong>
        </span>
      ),
      onOk: () => {
        this.props.removePost(post.id);
      },
    });
  };
  actionColumn = (text, post) => (
    <span>
      <PostEditButton post={post} />
      <Button type="danger" onClick={() => this.removePost(post)}>
        Delete
      </Button>
    </span>
  );
  renderHead() {
    return (
      <Helmet>
        <title>Post Page</title>
      </Helmet>
    );
  }
  render() {
    const { renderHead } = this;
    const { loading, posts } = this.props;
    return (
      <div>
        {renderHead()}
        <Row type="flex" justify="space-between" align="middle">
          <h1>Post Page</h1>
          <PostCreateButton />
        </Row>
        <Card loading={loading}>
          <PostList posts={posts} actionColumn={this.actionColumn} />
        </Card>
      </div>
    );
  }
}

PostPage.propTypes = {
  error: PropTypes.object,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  posts: makeSelectPosts(),
  loading: makeSelectPostsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: () => dispatch(loadPosts()),
  removePost: (id) => dispatch(removePost(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'posts', reducer });
const withSaga = injectSaga({ key: 'posts', saga });
export default compose(withReducer, withSaga, withConnect)(PostPage);
