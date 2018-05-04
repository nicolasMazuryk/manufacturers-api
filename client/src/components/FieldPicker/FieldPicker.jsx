import React, { Component } from 'react';
import { Cascader, Select, Input, Form, Icon, Button, Row } from 'antd';

import './FieldPicker.scss';

export default class FieldPicker extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   tableColumn: '',
    //   whereColumnOptions: [],
    //   whereField: '',
    //   whereValue: '',
    // };

    this.filter = this.filter.bind(this);
  }

  filter(inputValue, path) {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }

  render() {
    const {
      name,
      title,
      tableTree,
      onCascaderChange,
      onSelectChange,
      onConditionValueChange,
      onTest,
      queryParams,
    } = this.props;
    // const { whereColumnOptions, whereField, whereValue } = this.state;
    const Option = Select.Option;

    if (!tableTree) return null;

    return (
      <div>
        <Row>
          <h3>{title}</h3>
          <span>SELECT</span>
          <Cascader
            options={tableTree}
            onChange={onCascaderChange}
            placeholder="Please select"
            style={{ width: 300 }}
            showSearch={{ filter: this.filter }}
          />
          <span>WHERE</span>
          <Select
            style={{ width: 200 }}
            value={queryParams.params.where.column}
            onChange={onSelectChange}
          >
            {queryParams.columnOptions.map(option => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <span>{queryParams.params.where.operator}</span>
          <Input
            value={queryParams.params.where.value}
            style={{ width: 200 }}
            onChange={onConditionValueChange}
          />
          <Button onClick={onTest}>Test Query</Button>
        </Row>
      </div>
    );
  }
}
