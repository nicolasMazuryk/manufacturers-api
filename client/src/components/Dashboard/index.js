import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dashboard from './Dashboard';

import { loading, tableTree } from '../../redux/dashboard/selectors';
import { fields } from '../../redux/product/selectors';
import { dashboardInfo } from '../../redux/dashboard/actions';
import { testQuery, createProduct } from '../../redux/product/actions';

const selector = createStructuredSelector({
  tableTree,
  fields,
  loading,
});

const actions = {
  dashboardInfo,
  testQuery,
  createProduct,
};

export { Dashboard };

export default connect(selector, actions)(Dashboard);
