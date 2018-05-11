import React, { Component } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Link } from 'react-router-dom';
import { PRODUCT_FIELDS, conditionOptions } from '../../config';

import { Switch, Cascader, Form, Input, Row, Col, Button } from 'antd';

import './Dashboard.scss';

import FieldPicker from '../FieldPicker';

export default class Dashboard extends Component {
  static propTypes = exact({
    tableTree: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    dashboardInfo: PropTypes.func.isRequired,
    testQuery: PropTypes.func.isRequired,
    createProduct: PropTypes.func.isRequired,
  });

  constructor(props) {
    super(props);

    this.state = {
      tableTree: [],
      isGroup: true,
      primaryTableKey: [],
      queryParams: PRODUCT_FIELDS.reduce((acc, field) => {
        acc[field.name] = {
          name: field.name,
          columnOptions: [],
          conditionOption: conditionOptions.COLUMN,
          params: {
            table: '',
            column: '',
            where: {
              column: '',
              operator: '=',
              value: '',
              foreignColumn: [],
            },
            // customValue: '',
          },
        };
        return acc;
      }, {}),
    };

    this.testQuery = this.testQuery.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.onGroupToggle = this.onGroupToggle.bind(this);
    this.onPrimaryKeyChange = this.onPrimaryKeyChange.bind(this);
    this.onCascaderChange = this.onCascaderChange.bind(this);
    this.onForeignCascaderChange = this.onForeignCascaderChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onConditionValueChange = this.onConditionValueChange.bind(this);
    this.setEntityState = this.setEntityState.bind(this);
    this.filter = this.filter.bind(this);
    this.onConditionOptionChange = this.onConditionOptionChange.bind(this);
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

  onGroupToggle(isGroup) {
    this.setState({ isGroup });
  }

  onConditionOptionChange(fieldName) {
    return event => {
      const value = event.target.value;
      const entity = this.state.queryParams[fieldName];

      entity.conditionOption = value;

      // clear previous inputs on change

      // entity.params.where.value = '';
      // entity.params.where.foreignColumn = [];

      this.setEntityState(fieldName, entity);
    }
  }

  testQuery(fieldName) {
    const isGroup = this.state.isGroup;
    const params = this.state.queryParams[fieldName].params;
    this.props.testQuery({ fieldName, isGroup, params });
  }

  createProduct() {
    const { isGroup, primaryTableKey, queryParams } = this.state;
    const params = Object.keys(queryParams).map(field => {
      return {
        ...queryParams[field].params,
        name: queryParams[field].name,
      };
    });
    this.props.createProduct({ isGroup, primaryTableKey, params });
  }

  onPrimaryKeyChange(primaryTableKey) {
    this.setState({ primaryTableKey })
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

  onForeignCascaderChange(fieldName) {
    return (value, selectedOptions) => {
      const entity = this.state.queryParams[fieldName];

      entity.params.where.foreignColumn = value;

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

  filter(inputValue, path) {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }

  render() {
    const { isGroup, tableTree, queryParams } = this.state;
    return (
      <Col span={20}>
        <Row type="flex" justify="end">
          <Switch
            checked={isGroup}
            onChange={this.onGroupToggle}
            checkedChildren="Group Select"
            unCheckedChildren="Single Select"
          />
        </Row>
        <Row style={{marginLeft: 400, marginRight: 400}} type="flex" justify="space-around" align="middle">
          <h6>Primary table / key</h6>
          <Cascader
            options={tableTree}
            onChange={this.onPrimaryKeyChange}
            placeholder="e.g. product / id"
            style={{ width: 300 }}
            showSearch={{ filter: this.filter }}
          />
        </Row>
        {PRODUCT_FIELDS.map(field => (
          <Row key={field.title}>
            <FieldPicker
              name={field.name}
              isGroup={isGroup}
              title={field.title}
              queryParams={queryParams[field.name]}
              onCascaderChange={this.onCascaderChange(field.name)}
              onForeignCascaderChange={this.onForeignCascaderChange(field.name)}
              onSelectChange={this.onSelectChange(field.name)}
              onConditionValueChange={this.onConditionValueChange(field.name)}
              onTest={() => this.testQuery(field.name)}
              tableTree={tableTree}
              onConditionOptionChange={this.onConditionOptionChange(field.name)}
            />
          </Row>
        ))}
        <Row type="flex" justify="end">
          <Button type="primary" onClick={this.createProduct}>Migrate All Products</Button>
        </Row>
      </Col>
    );
  }
}
