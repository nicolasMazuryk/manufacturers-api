import React, { Component } from 'react';
import { Form, Button, Row } from 'antd';
import { TextField } from 'redux-form-antd';
import { Field } from 'redux-form';

import './ConnectDbForm.scss';

export default class ConnectDbForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} styleName="form">
        <Form.Item styleName="input">
          <Field
            name="host"
            type="text"
            placeholder="hostname or ip"
            component={TextField}
          />
        </Form.Item>
        <Form.Item styleName="input">
          <Field
            name="port"
            type="text"
            placeholder="port"
            component={TextField}
          />
        </Form.Item>
        <Form.Item styleName="input">
          <Field
            name="database"
            type="text"
            placeholder="database"
            component={TextField}
          />
        </Form.Item>
        <Form.Item styleName="input">
          <Field
            name="username"
            type="text"
            placeholder="username"
            component={TextField}
          />
        </Form.Item>
        <Form.Item styleName="input">
          <Field
            name="password"
            // type="password"
            type="text"
            placeholder="password"
            component={TextField}
          />
        </Form.Item>
        <Form.Item styleName="input">
          <Field
            name="schema"
            type="text"
            placeholder="schema"
            component={TextField}
          />
        </Form.Item>
        <Row styleName="submit">
          <Button type="primary" htmlType="submit">
            Connect
          </Button>
        </Row>
      </Form>
    );
  }
}
