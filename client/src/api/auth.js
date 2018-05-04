import Base from './base';

export default class Auth extends Base {
  profile() {
    return this.apiClient.get('users/me');
  }

  login(email, password) {
    return this.apiClient.post('auth', { data: { email, password } });
  }

  async logout() {
    return this.apiClient.post('logout');
  }
}
