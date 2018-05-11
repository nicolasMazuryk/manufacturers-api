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
