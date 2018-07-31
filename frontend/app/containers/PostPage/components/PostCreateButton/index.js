/**
 *
 * PostCreateButton
 *
 */

import React, { Component } from 'react';
import { Button, Form, Modal } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PostForm from '../PostForm';
import { createPost } from '../../actions';

class PostCreateButton extends Component {
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
    this.props.createPost(postData).then(() => {
      this.setState({
        loading: false,
        modalVisible: false,
      });
      this.postform.resetFields();
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div className="post-create-button">
        <Button type="primary" onClick={() => this.toggleModal()}>
          Create Post
        </Button>
        <Modal
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleModal()}
        >
          <h2>Create Post</h2>
          <PostForm
            ref={(postform) => (this.postform = postform)}
            loading={loading}
            onCancel={() => this.toggleModal()}
            onSubmit={(postData) => this.submit(postData)}
          />
        </Modal>
      </div>
    );
  }
}
PostCreateButton.propTypes = {
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  createPost: (post) =>
    new Promise((resolve, reject) =>
      dispatch(createPost(post, resolve, reject))),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostCreateButton);
