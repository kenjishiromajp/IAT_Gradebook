/**
 *
 * LoginPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Button, Form, Icon, Input, Alert } from 'antd';
import './style.less';
import { loginUser } from './actions';
import LogoIAT from '../../../components/Icons/Logo/index';
import { makeSelectError, makeSelectLoading } from './selectors';
import { isValidUser } from '../../../utils/authentication';
import { withLoginUser } from '../../../utils/withLoginUser';

const FormItem = Form.Item;

class LoginPage extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { form, loginUser } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        loginUser(email, password);
      }
    });
  };

  renderHead = () => (
    <Helmet>
      <title>Login - IAT</title>
    </Helmet>
  );

  renderLoginError = (error) => {
    if (error && error.messageTitle && error.message) {
      return (
        <Alert
          message={error.messageTitle}
          description={error.message}
          type="error"
          style={{ width: '320px', marginBottom: '25px' }}
        />
      );
    }
    return null;
  };
  render() {
    const { renderHead } = this;
    const { getFieldDecorator } = this.props.form;
    const { user, loading, error } = this.props;

    if (isValidUser(user)) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-page">
        {renderHead()}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="login-logo">
            <LogoIAT />
          </div>
          {this.renderLoginError(error)}
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'E-mail inválido!' },
                {
                  required: true,
                  message: 'Por favor, preencher o campo e-mail!',
                },
              ],
            })(<Input
              autoComplete="off"
              prefix={<Icon type="user" className="input-icon" />}
              placeholder="E-mail"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Por favor, preencher o campo senha!',
                },
              ],
            })(<Input
              prefix={<Icon type="lock" className="input-icon" />}
              type="password"
              placeholder="Senha"
            />)}
          </FormItem>
          <FormItem className="_align-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button _uppercase"
              loading={loading}
            >
              Login
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  form: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const mapDispatchToProps = {
  loginUser,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(Form.create(), withConnect, withLoginUser)(LoginPage);
