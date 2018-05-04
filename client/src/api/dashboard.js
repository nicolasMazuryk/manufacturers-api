import Base from './base';

export default class Dashboard extends Base {
  info() {
    return this.apiClient.get('dashboard/info');
  }

  test(params) {
    return this.apiClient.post('products/test', { data: params });
  }

  connectToDb(config) {
    return this.apiClient.post('connect', { data: config });
  }
}
