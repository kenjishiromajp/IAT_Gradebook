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
import { makeSelectCurrentUser } from '../Pages/LoginPage/selectors';
import { logoutUser } from '../Pages/LoginPage/actions';
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

class ProfileUserDropdownContainer extends Component {
  state = {
    visible: false,
  };
  renderMenu = () => (
    <Menu>
      <MenuItem key="2">
        <Link to="" onClick={() => this.props.logoutUser()}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );
  render() {
    const { currentUser } = this.props;
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
