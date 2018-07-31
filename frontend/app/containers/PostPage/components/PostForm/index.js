/**
 *
 * PostForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';

const FormItem = Form.Item;
const { TextArea } = Input;

class PostForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const postData = this.props.post
      ? { ...this.props.form.getFieldsValue(), id: this.props.post.id }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(postData);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const titleError = this.getError('title');
    const descriptionError = this.getError('description');
    return (
      <div className="post-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="post-form"
        >
          <FormItem
            validateStatus={titleError ? 'error' : ''}
            help={titleError || ''}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please insert a title!' }],
            })(<Input placeholder="Title" />)}
          </FormItem>
          <FormItem
            validateStatus={descriptionError ? 'error' : ''}
            help={descriptionError || ''}
          >
            {getFieldDecorator('description', {
              rules: [
                { required: true, message: 'Please insert a Description!' },
              ],
            })(<TextArea placeholder="Description" />)}
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancel</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.post ? 'Edit' : 'Create'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

PostForm.propTypes = {
  form: PropTypes.object.isRequired,
  post: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create({
  mapPropsToFields({ post }) {
    return post
      ? {
        title: Form.createFormField({ value: post.title }),
        description: Form.createFormField({ value: post.description }),
      }
      : {};
  },
});
export default compose(withFormCreate)(PostForm);
