import React, { Component } from 'react';
import { Form, Icon, Button, Row } from 'antd';
import { TextField } from 'redux-form-antd';
import { Field } from 'redux-form';

import './LoginForm.scss';

export default class LoginForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} styleName="form">
        <Form.Item styleName="input">
          <Field
            name="email"
            type="text"
            placeholder="email"
            component={TextField}
            prefix={<Icon type="user" styleName="icon" />}
          />
        </Form.Item>
        <Form.Item styleName="input">
          <Field
            name="password"
            type="password"
            placeholder="password"
            component={TextField}
            prefix={<Icon type="lock" styleName="icon" />}
          />
        </Form.Item>
        <Row styleName="submit">
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Row>
      </Form>
    );
  }
}
