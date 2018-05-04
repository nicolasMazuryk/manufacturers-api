import Base from '../Base';
import X from '../Exception';
import db from '../../db';
import { generate } from './authToken';
import status from 'http-status-codes';

const { User } = db.models;

export default class AuthCreate extends Base {
  static get validationRules() {
    return {
      data: [
        'required',
        {
          nested_object: {
            email: ['required', 'trim', 'email', 'to_lc'],
            password: 'required',
          },
        },
      ],
    };
  }

  async execute({ data: { email, password } }) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !user.checkPassword(password)) {
      throw new X({
        code: 'AUTHENTICATION_FAILED',
        status: status.UNAUTHORIZED,
        fields: {
          email: 'INVALID',
          password: 'INVALID',
        },
      });
    }

    // if (user.status !== User.STATUS.ACTIVE) {
    //   throw new X({
    //     code: 'NOT_ACTIVE_USER',
    //     fields: {
    //       status: 'NOT_ACTIVE_USER',
    //     },
    //   });
    // }

    return {
      data: {
        jwt: generate({ id: user.id }),
      },
    };
  }
}
