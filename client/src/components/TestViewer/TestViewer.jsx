import React, { Component } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Row, Col } from 'antd';

import './TestViewer.scss';

export default class TestViewer extends Component {
  static propTypes = exact({
    name: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
  });

  render() {
    const { name, fields } = this.props;
    if (!fields) return null;
    const entity = fields[name];

    return (
      <Col span={3} styleName="TestViewer">{entity.test}</Col>
    );
  }
}
