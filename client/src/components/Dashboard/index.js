import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dashboard from './Dashboard';

import { loading, tableTree, fields } from '../../redux/dashboard/selectors';
import { dashboardInfo, testQuery } from '../../redux/dashboard/actions';
// import {
//   wsDashboardConnect,
//   wsDashboardDisconnect,
// } from '../../redux/websocket/actions';

const selector = createStructuredSelector({
  tableTree,
  fields,
  loading,
});

const actions = {
  // wsDashboardConnect,
  // wsDashboardDisconnect,
  dashboardInfo,
  testQuery,
};

export { Dashboard };

export default connect(selector, actions)(Dashboard);
