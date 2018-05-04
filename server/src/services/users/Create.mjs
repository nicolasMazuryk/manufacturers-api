import Base from '../Base';
import X from '../Exception';
import db from '../../db';
import { dumpUser } from '../utils';
import emailSender from '../emailSender';
import status from 'http-status-codes';

const { User } = db.models;
const { Action } = db.models;

export default class UsersCreate extends Base {
  static get validationRules() {
    return {
      data: [
        'required',
        {
          nested_object: {
            email: ['required', 'trim', 'email', 'to_lc'],
            username: 'required',
            password: 'required',
            confirmPassword: ['required', { equal_to_field: ['password'] }],
          },
        },
      ],
    };
  }

  async execute({ data: { email, username, password } }) {
    if (await User.findOne({ where: { email } })) {
      throw new X({
        code: 'NOT_UNIQUE',
        status: status.UNPROCESSABLE_ENTITY,
        fields: {
          email: 'NOT_UNIQUE',
        },
      });
    }

    const user = new User({ email, username, password });

    await user.save();

    const action = await new Action({
      type: 'confirmEmail',
      hash: Action.generateHash(),
      data: {
        userId: user.id,
        email: user.email,
      },
    }).save();

    await emailSender.send('confirmEmail', email, {
      hash: action.hash,
    });

    return {
      data: dumpUser(user),
    };
  }
}
