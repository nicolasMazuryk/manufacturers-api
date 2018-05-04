import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
const { Header, Content, Footer } = Layout;

import { ROUTES } from '../../routes';

import './MainLayout.scss';

export default class MainLayout extends Component {
  componentWillMount() {
    this.props.init();
  }

  renderFreeMenu = () => [
    <Menu.Item key={ROUTES.LOGIN}>
      <Link to={ROUTES.LOGIN}>LOGIN</Link>
    </Menu.Item>,
  ];

  renderLoggedMenu = () => [
    <Menu.Item key={ROUTES.HOME}>
      <Link to={ROUTES.HOME}>HOME</Link>
    </Menu.Item>,
    <Menu.Item style={{ float: 'right' }} key="logout">
      <Button
        icon="logout"
        type="danger"
        htmlType="button"
        onClick={this.props.logout}
      >
        LOGOUT
      </Button>
    </Menu.Item>,
  ];

  render() {
    return (
      <Layout styleName="root">
        <Header>
          <div styleName="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[this.props.pathname]}
            styleName="menu"
          >
            {this.props.user ? this.renderLoggedMenu() : this.renderFreeMenu()}
          </Menu>
        </Header>
        <Content styleName="content">{this.props.children}</Content>
        <Footer theme="dark" styleName="footer">
          Atero.co © {new Date().getFullYear()}
        </Footer>
      </Layout>
    );
  }
}
