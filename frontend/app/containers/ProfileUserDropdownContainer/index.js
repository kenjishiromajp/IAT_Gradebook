/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * ProfileUserDropdownContainer
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { makeSelectCurrentUser } from '../../containers/LoginPage/selectors';
import { logoutUser } from '../LoginPage/actions';
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

class ProfileUserDropdownContainer extends Component {
  state = {
    visible: false,
  };
  onCancel = () => this.setState({ visible: false });
  showEditMyProfileModal = () => this.setState({ visible: true });
  renderMenu = () => (
    <Menu>
      <MenuItem key="0">
        <Link to="#" onClick={() => this.showEditMyProfileModal()}>
          Editar Perfil
        </Link>
      </MenuItem>
      <MenuDivider />

      <MenuItem key="2">
        <Link to="" onClick={() => this.props.logoutUser()}>
          Sair
        </Link>
      </MenuItem>
    </Menu>
  );
  render() {
    const { currentUser } = this.props;
    const { visible } = this.state;
    return (
      <div className="profile-user">
        <Row type="flex" justify="end" gutter={16}>
          <Col>
            <Dropdown overlay={this.renderMenu()} trigger={['click']}>
              <Link to="#" style={{ textDecoration: 'none' }}>
                {currentUser.name}
                <Icon className="trigger" type="down" />
              </Link>
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

ProfileUserDropdownContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfileUserDropdownContainer);
