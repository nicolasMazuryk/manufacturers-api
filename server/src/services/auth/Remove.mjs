import Base from '../Base';
import dbManager from '../dbManager';
export default class AuthCreate extends Base {
  async execute() {
    dbManager.diconnect();

    return {
      data: null,
    };
  }
}
