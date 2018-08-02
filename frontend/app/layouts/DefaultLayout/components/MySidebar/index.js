import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import MyMenuItem from '../MyMenuItem/index';
import getMenuItems from './getMenuItems';
import MySubMenuItem from '../MySubMenuItem/index';
import './style.less';
const { Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class MySidebar extends Component {
  toFilterMenu(notAllowedRoles) {
    let invalid = false;
    const { userRole } = this.props;
    if (notAllowedRoles) {
      for (let i = 0; i < notAllowedRoles.length; i += 1) {
        if (notAllowedRoles[i] === userRole) {
          invalid = true;
          break;
        }
      }
    }
    return invalid;
  }

  renderMenuItems() {
    return getMenuItems().map((menuItem) => {
      if (this.toFilterMenu(menuItem.notAllowedRoles)) {
        return false;
      }
      if (menuItem.subMenu) {
        return this.renderSubMenu(menuItem);
      }
      return (
        <MenuItem key={menuItem.to}>
          <MyMenuItem {...menuItem} />
        </MenuItem>
      );
    });
  }

  renderSubMenu = (menuItem) => {
    const mySubMenuItem = <MySubMenuItem {...menuItem} />;
    return (
      <SubMenu key={menuItem.to} title={mySubMenuItem}>
        {menuItem.subMenu.map((item) => (
          <MenuItem key={item.to}>
            <MyMenuItem {...item} />
          </MenuItem>
        ))}
      </SubMenu>
    );
  };

  render() {
    const { opened, currentPath } = this.props;
    return (
      <Sider
        width={220}
        trigger={null}
        collapsible
        collapsed={!opened}
        className="my-sider"
      >
        <div>
          <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
            {this.renderMenuItems()}
          </Menu>
        </div>
      </Sider>
    );
  }
}

MySidebar.propTypes = {
  currentPath: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};
export default MySidebar;
