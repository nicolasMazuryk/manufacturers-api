export const prefix = 'dashboard';

export const DASHBOARD_INFO_REQUEST = `${prefix}/DASHBOARD_INFO_REQUEST`;
export const DASHBOARD_INFO_SUCCESS = `${prefix}/DASHBOARD_INFO_SUCCESS`;
export const DASHBOARD_INFO_FAILURE = `${prefix}/DASHBOARD_INFO_FAILURE`;

export const dashboardInfo = () => ({
  types: [
    DASHBOARD_INFO_REQUEST,
    DASHBOARD_INFO_SUCCESS,
    DASHBOARD_INFO_FAILURE,
  ],
  promise: api => api.dashboard.info(),
});

export const TEST_QUERY_REQUEST = `${prefix}/TEST_QUERY_REQUEST`;
export const TEST_QUERY_SUCCESS = `${prefix}/TEST_QUERY_SUCCESS`;
export const TEST_QUERY_FAILURE = `${prefix}/TEST_QUERY_FAILURE`;

export const testQuery = (params) => ({
  types: [TEST_QUERY_REQUEST, TEST_QUERY_SUCCESS, TEST_QUERY_FAILURE],
  promise: api => api.dashboard.test(params),
});
