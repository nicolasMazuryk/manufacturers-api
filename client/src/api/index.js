import config from '../config';
import ApiClient from './client';

import Auth from './auth';
import Dashboard from './dashboard';

const apiClient = new ApiClient(config.apiPrefix);

export default {
  auth: new Auth(apiClient),
  dashboard: new Dashboard(apiClient),
  client: apiClient,
};
