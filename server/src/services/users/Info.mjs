import Base from '../Base';
import X from '../Exception';
import db from '../../db';
import { dumpUser } from '../utils';
import status from 'http-status-codes';

const { User } = db.models;

export default class UsersInfo extends Base {
  async execute() {
    const user = await User.findById(this.context.id);

    if (!user) {
      throw new X({
        code: 'NOT_FOUND',
        status: status.NOT_FOUND,
        fields: {
          id: 'NOT_FOUND',
        },
      });
    }

    return {
      data: dumpUser(user),
    };
  }
}
