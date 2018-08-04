import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Card, Row } from 'antd';
import UserListContainer from '../../UserListContainer';
import ModalButton from '../../../components/ModalButton';
import UserFormContainer from '../../UserFormContainer';

class UserPage extends Component {
  state = {
    modalOpened: false,
  };
  handleCanceModal = () => {
    this.setState({
      modalOpened: false,
    });
  };
  handleOpenModal = () => {
    this.setState({
      modalOpened: true,
    });
  };
  render() {
    const { modalOpened } = this.state;
    return (
      <div>
        <Helmet>
          <title>IAT - Users</title>
        </Helmet>
        <Row type="flex" justify="space-between" align="middle">
          <div>
            <h1>Users</h1>
            <h3>List of Users</h3>
          </div>
          <div>
            <ModalButton
              buttonLabel="Register User"
              visible={modalOpened}
              onCancel={this.handleCanceModal}
              onOpen={this.handleOpenModal}
            >
              <h3>Register User</h3>
              <UserFormContainer />
            </ModalButton>
          </div>
        </Row>
        <Card>
          <UserListContainer />
        </Card>
      </div>
    );
  }
}

export default UserPage;
