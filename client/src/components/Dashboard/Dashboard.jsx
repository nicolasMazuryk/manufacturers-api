import React, { Component } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Link } from 'react-router-dom';
import { PRODUCT_FIELDS } from '../../config';

import { Switch, Form, Input, Row, Col, Button } from 'antd';

import './Dashboard.scss';

import FieldPicker from '../FieldPicker';

export default class Dashboard extends Component {
  static propTypes = exact({
    tableTree: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    dashboardInfo: PropTypes.func.isRequired,
    testQuery: PropTypes.func.isRequired,
  });

  constructor(props) {
    super(props);

    this.state = {
      tableTree: [],
      isBatch: true,
      queryParams: PRODUCT_FIELDS.reduce((acc, field) => {
        acc[field.name] = {
          name: field.name,
          params: {
            table: '',
            column: '',
            where: {
              column: '',
              operator: '=',
              value: '',
            },
          },
          columnOptions: [],
        };
        return acc;
      }, {}),
    };

    this.testQuery = this.testQuery.bind(this);
    this.onBatchToggle = this.onBatchToggle.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onConditionValueChange = this.onConditionValueChange.bind(this);
    this.setEntityState = this.setEntityState.bind(this);
  }

  componentDidMount() {
    this.props.dashboardInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tableTree: this.convertTableTreeToOptions(nextProps.tableTree),
    });
  }

  convertTableTreeToOptions(tableTree) {
    if (!Object.keys(tableTree).length) return [];

    return Object.keys(tableTree).map(tableName => ({
      value: tableName,
      label: tableName,
      children: tableTree[tableName].map(columnName => ({
        value: columnName,
        label: columnName,
      })),
    }));
  }

  onBatchToggle(isBatch) {
    this.setState({ isBatch });
  }

  testQuery(fieldName) {
    const params = this.state.queryParams[fieldName].params;
    this.props.testQuery({ fieldName, params });
  }

  onCascaderChange(fieldName) {
    return (value, selectedOptions) => {
      const [table, column] = value;

      const columnOptions = selectedOptions.length
        ? selectedOptions[0].children.map(({ value }) => value)
        : [];
      const whereColumn = columnOptions[0];

      const entity = this.state.queryParams[fieldName];

      entity.params.table = table;
      entity.params.column = column;
      entity.params.where.column = whereColumn;
      entity.columnOptions = columnOptions;

      this.setEntityState(fieldName, entity);
    };
  }

  onSelectChange(fieldName) {
    return whereColumn => {
      const entity = this.state.queryParams[fieldName];
      entity.params.where.column = whereColumn;

      this.setEntityState(fieldName, entity);
    };
  }

  onConditionValueChange(fieldName) {
    return e => {
      const value = e.target.value;
      const entity = this.state.queryParams[fieldName];

      entity.params.where.value = value;

      this.setEntityState(fieldName, entity);
    };
  }

  setEntityState(fieldName, entity) {
    this.setState({
      ...this.state,
      queryParams: {
        ...this.state.queryParams,
        [fieldName]: entity,
      },
    });
  }

  render() {
    const { isBatch, tableTree, queryParams } = this.state;
    return (
      <Col span={20}>
        <Row type="flex" justify="end">
          <Switch
            checked={isBatch}
            onChange={this.onBatchToggle}
            checkedChildren="Group Select"
            unCheckedChildren="Single Select"
          />
        </Row>
        {PRODUCT_FIELDS.map(field => (
          <Row key={field.title}>
            <FieldPicker
              name={field.name}
              title={field.title}
              queryParams={queryParams[field.name]}
              onCascaderChange={this.onCascaderChange(field.name)}
              onSelectChange={this.onSelectChange(field.name)}
              onConditionValueChange={this.onConditionValueChange(field.name)}
              onTest={() => this.testQuery(field.name)}
              tableTree={tableTree}
            />
          </Row>
        ))}
      </Col>
    );
  }
}
