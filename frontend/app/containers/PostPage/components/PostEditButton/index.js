/**
 *
 * PostEditButton
 *
 */

import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PostForm from '../PostForm';
import { editPost } from '../../actions';

class PostEditButton extends Component {
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
    this.props.editPost(postData);
  };
  render() {
    const { loading } = this.state;
    const { post } = this.props;
    return (
      <span className="post-edit-button">
        <Button onClick={() => this.toggleModal()}>Edit Post</Button>
        <Modal
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleModal()}
        >
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
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  editPost: (post) =>
    new Promise((resolve, reject) => dispatch(editPost(post, resolve, reject))),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostEditButton);
