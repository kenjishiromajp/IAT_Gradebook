import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Col, Icon, Layout, Row } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import './style.less';
import MySidebar from './components/MySidebar';
import MyHeader from './components/MyHeader';
import { toggleSidebar } from './actions';
import { makeSelectError, makeSelectSidebarOpened } from './selector';
import { makeSelectLocation } from '../../containers/App/selectors';
import { makeSelectCurrentUser } from '../../containers/LoginPage/selectors';
import ProfileUser from '../../containers/ProfileUserDropdownContainer/index';
import AlertNotificationContainer from '../../containers/AlertNotificationContainer';
import openNotificationWithIcon from '../../utils/antd-notification';
import routeReducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import DefaultContentError from '../../components/DefaultContentError';

const { Content } = Layout;
class DefaultLayout extends React.Component {
  componentDidUpdate() {
    if (!navigator.onLine) {
      openNotificationWithIcon(
        'error',
        'Erro de conexão',
        'Verifique sua conexão com a internet',
        <Icon type="wifi" style={{ color: '#f00' }} />
      );
    }
  }
  openSidebar = () => {
    this.props.toggleSidebar();
  };
  render() {
    const { openSidebar } = this;
    const {
      component: Component,
      location,
      sidebarOpened,
      user,
      error,
      ...rest
    } = this.props;
    const userRole = user.role;
    const { company } = user;
    return (
      <Route
        {...rest}
        render={(matchProps) => (
          <div className="default-layout">
            <Layout>
              <MySidebar
                currentPath={location.pathname}
                opened={sidebarOpened}
                userRole={userRole}
                company={company}
              />
              <Layout>
                <MyHeader>
                  <Row
                    type="flex"
                    justify="space-between"
                    style={{ width: '100%' }}
                  >
                    <Col>
                      <Icon
                        className="trigger"
                        onClick={openSidebar}
                        type={sidebarOpened ? 'menu-fold' : 'menu-unfold'}
                      />
                    </Col>
                    <Col>
                      <Row type="flex" gutter={15}>
                        <Col>
                          <AlertNotificationContainer />
                        </Col>
                        <Col>
                          <ProfileUser />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </MyHeader>
                <Content>
                  {error ? (
                    <DefaultContentError error={error} />
                  ) : (
                    <Component {...matchProps} />
                  )}
                </Content>
              </Layout>
            </Layout>
          </div>
        )}
      />
    );
  }
}

DefaultLayout.propTypes = {
  location: PropTypes.object.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(React.Component),
    PropTypes.func,
  ]).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  sidebarOpened: makeSelectSidebarOpened(),
  location: makeSelectLocation(),
  user: makeSelectCurrentUser(),
  error: makeSelectError(),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: () => dispatch(toggleSidebar()),
});

const withRouteReducer = injectReducer({ key: 'route', reducer: routeReducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withRouteReducer, withConnect)(DefaultLayout);
