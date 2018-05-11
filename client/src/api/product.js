import Base from './base';

export default class Product extends Base {
  test(params) {
    return this.apiClient.post('products/test', { data: params });
  }

  bulkCreate(params) {
    return this.apiClient.post('products/bulkCreate', { data: params });
  }
}
