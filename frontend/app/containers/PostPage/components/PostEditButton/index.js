/**
 *
<<<<<<< HEAD
 * PostCreateButton
=======
 * PostEditButton
>>>>>>> 2139a24f8ae639e91cb9f65a0d14cc136c8bfb84
 *
 */

import React, { Component } from 'react';
import { Button, Form, Modal } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PostForm from '../PostForm';
<<<<<<< HEAD
import './style.less';
import { updatePost } from '../../actions';

class PostCreateButton extends Component {
=======
import { editPost } from '../../actions';

class PostEditButton extends Component {
>>>>>>> 2139a24f8ae639e91cb9f65a0d14cc136c8bfb84
  state = {
    loading: false,
    modalVisible: false,
  };
  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  submit = (postData) => {
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
<<<<<<< HEAD
    this.props.updatePost(postData).then(() => {
      this.setState({
        loading: false,
        modalVisible: false,
      });
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div className="post-create-button">
        <Button type="primary" onClick={() => this.toggleModal()}>
          Create Post
        </Button>
=======
    this.props.editPost(postData);
  };
  render() {
    const { loading } = this.state;
    const { post } = this.props;
    return (
      <span className="post-edit-button">
        <Button onClick={() => this.toggleModal()}>Edit Post</Button>
>>>>>>> 2139a24f8ae639e91cb9f65a0d14cc136c8bfb84
        <Modal
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleModal()}
        >
<<<<<<< HEAD
          <h2>Create Post</h2>
          <PostForm
            ref={(postform) => (this.postform = postform)}
            loading={loading}
            onCancel={() => this.toggleModal()}
            onCreate={(postData) => this.submit(postData)}
          />
        </Modal>
      </div>
    );
  }
}
PostCreateButton.propTypes = {
  updatePost: PropTypes.func.isRequired,
=======
          <h2>
            Edit Post <strong>#{post.id}</strong>
          </h2>
          <PostForm
            post={post}
            ref={(postform) => (this.postform = postform)}
            loading={loading}
            onCancel={() => this.toggleModal()}
            onSubmit={(postData) => this.submit(postData)}
          />
        </Modal>
      </span>
    );
  }
}
PostEditButton.propTypes = {
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
>>>>>>> 2139a24f8ae639e91cb9f65a0d14cc136c8bfb84
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
<<<<<<< HEAD
  updatePost: (post) =>
    new Promise((resolve, reject) =>
      dispatch(updatePost(post, resolve, reject))),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostCreateButton);
=======
  editPost: (post) =>
    new Promise((resolve, reject) => dispatch(editPost(post, resolve, reject))),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostEditButton);
>>>>>>> 2139a24f8ae639e91cb9f65a0d14cc136c8bfb84
