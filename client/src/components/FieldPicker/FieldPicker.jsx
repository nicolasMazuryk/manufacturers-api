import React, { Component } from 'react';
import { Cascader, Select, Input, Radio, Form, Icon, Button, Row } from 'antd';
import { conditionOptions } from '../../config';
import TestViewer from '../TestViewer';

import './FieldPicker.scss';

const RadioGroup = Radio.Group;

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

  showOnColumnRadio() {
    const {
      onSelectChange,
      queryParams,
    } = this.props;
    const Option = Select.Option;
    return (
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
    )
  }

  showOnForeignColumnRadio() {
    const {
      tableTree,
      onForeignCascaderChange,
      onSelectChange,
      queryParams,
    } = this.props;
    const Option = Select.Option;
    return (
      <React.Fragment>
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
        <Cascader
          options={tableTree}
          onChange={onForeignCascaderChange}
          placeholder="Please select"
          style={{ width: 300 }}
          showSearch={{ filter: this.filter }}
        />
      </React.Fragment>
    )
  }

  showOnWhereValueRadio() {
    const {
      onSelectChange,
      onConditionValueChange,
      queryParams,
    } = this.props;
    const Option = Select.Option;
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  render() {
    const {
      name,
      title,
      isGroup,
      tableTree,
      onCascaderChange,
      onForeignCascaderChange,
      onSelectChange,
      onConditionValueChange,
      onTest,
      queryParams,
      onConditionOptionChange,
    } = this.props;
    const Option = Select.Option;
    const { COLUMN, FOREIGN_COLUMN, WHERE_VALUE, CUSTOM_VALUE } = conditionOptions;
    if (!tableTree) return null;

    return (
      <div styleName="FieldPicker">
        <h5>{title}</h5>
        <Row type="flex" justify="space-between" align="middle">
          <span>SELECT</span>
          <Cascader
            options={tableTree}
            onChange={onCascaderChange}
            placeholder="Please select"
            style={{ width: 300 }}
            showSearch={{ filter: this.filter }}
          />
          <span>WHERE</span>

          <RadioGroup styleName="ConditionOptions" onChange={onConditionOptionChange} value={queryParams.conditionOption}>
            <Radio value={COLUMN}>{this.showOnColumnRadio()}</Radio>
            <Radio value={FOREIGN_COLUMN}>{this.showOnForeignColumnRadio()}</Radio>
            <Radio value={WHERE_VALUE}>{this.showOnWhereValueRadio()}</Radio>
            <Radio value={CUSTOM_VALUE}>NOT IMPLEMENTED</Radio>
          </RadioGroup>

          <Button onClick={onTest}>Test Query</Button>

          <TestViewer
            name={name}
          />
        </Row>
      </div>
    );
  }
}
