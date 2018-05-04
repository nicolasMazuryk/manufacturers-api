import Base from '../Base';
import X from '../Exception';
import db from '../../db';
import { dumpUser } from '../utils';
import status from 'http-status-codes';

const { User } = db.models;

export default class UsersUpdate extends Base {
  static get validationRules() {
    return {
      data: [
        'required',
        {
          nested_object: {
            firstname: { min_length: 2 },
            lastname: { min_length: 2 },
          },
        },
      ],
    };
  }

  async execute({ data }) {
    const user = await User.findByid(this.context.id);

    if (!user) {
      throw new X({
        code: 'NOT_FOUND',
        status: status.NOT_FOUND,
        fields: {
          id: 'NOT_FOUND',
        },
      });
    }

    await user.update(data);

    return {
      data: dumpUser(user),
    };
  }
}
