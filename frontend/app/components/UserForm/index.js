/**
 *
 * UserForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';
import SelectRoles from '../SelectRoles';

const FormItem = Form.Item;

class UserForm extends Component {
  componentDidMount() {
    const { form, user } = this.props;
    if (user) {
      const { name, email, role_id } = user;
      form.setFieldsValue({
        name,
        email,
        role_id,
      });
    }
    form.validateFields();
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
    const userData = this.props.user
      ? { ...this.props.form.getFieldsValue(), id: this.props.user.id }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(userData);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const nameError = this.getError('name');
    const emailError = this.getError('email');
    const role_idError = this.getError('role_id');
    const passwordError = this.getError('password');

    return (
      <div className="user-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="user-form"
        >
          <FormItem
            label="Name"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please insert a Name!' }],
            })(<Input placeholder="Name" />)}
          </FormItem>
          <FormItem
            label="Email"
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please insert a Email!' }],
            })(<Input placeholder="Email" />)}
          </FormItem>
          <FormItem
            label="Role"
            validateStatus={role_idError ? 'error' : ''}
            help={role_idError || ''}
          >
            {getFieldDecorator('role_id', {
              rules: [{ required: true, message: 'Please insert a Role Id!' }],
            })(<SelectRoles />)}
          </FormItem>
          <FormItem
            label="Password"
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please insert a Role Id!' }],
            })(<Input type="password" />)}
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancel</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.user ? 'Edit' : 'Create'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role_id: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(UserForm);
