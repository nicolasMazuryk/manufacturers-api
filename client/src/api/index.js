import config from '../config';
import ApiClient from './client';

import Auth from './auth';
import Dashboard from './dashboard';
import Product from './product';

const apiClient = new ApiClient(config.apiPrefix);

export default {
  auth: new Auth(apiClient),
  dashboard: new Dashboard(apiClient),
  product: new Product(apiClient),
  client: apiClient,
};
