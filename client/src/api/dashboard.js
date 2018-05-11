import Base from './base';

export default class Dashboard extends Base {
  info() {
    return this.apiClient.get('dashboard/info');
  }

  connectToDb(config) {
    return this.apiClient.post('connect', { data: config });
  }
}
