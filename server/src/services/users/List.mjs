import Base from '../Base';
import db from '../../db';
import { listUser } from '../utils';

const { User } = db.models;

export default class UsersList extends Base {
  static get requiredPermissions() {
    return [User.ROLE.ADMIN];
  }

  async execute() {
    const users = await User.list();

    return {
      data: users.map(listUser).filter(user => user.id !== this.context.id),
    };
  }
}
