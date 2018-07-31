/**
 *
 * LoginPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input } from 'antd';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';

import { login } from '../App/actions';

import './styles.less';

const FormItem = Form.Item;

class LoginPage extends Component {
  state = {};
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props.login(username, password);
      }
    });
  };
  renderHead() {
    return (
      <Helmet>
        <title>LoginPage</title>
      </Helmet>
    );
  }
  render() {
    const { renderHead } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        {renderHead()}
        <h1>LoginPage</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(<Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Username"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(<Input
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="password"
              placeholder="Password"
            />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(Form.create(), withConnect)(LoginPage);
