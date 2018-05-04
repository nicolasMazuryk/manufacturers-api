import Base from '../Base';
import X from '../Exception';
import db from '../../db';
import emailSender from '../emailSender';
import status from 'http-status-codes';

const { User } = db.models;
const { Action } = db.models;

export default class UsersResetPassword extends Base {
  static get validationRules() {
    return {
      data: {
        nested_object: {
          email: ['required', 'email'],
        },
      },
    };
  }

  async execute({ data: { email } }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new X({
        code: 'NOT_FOUND',
        status: status.NOT_FOUND,
        fields: {
          email: 'NOT_FOUND',
        },
      });
    }

    // if (user.status === User.STATUS.BLOCKED) {
    //   throw new X({
    //     code: 'BLOCKED_USER',
    //     status: status.FORBIDDEN,
    //     fields: {
    //       email: 'BLOCKED_USER',
    //     },
    //   });
    // }

    const action = await new Action({
      type: 'resetPassword',
      hash: Action.generateHash(),
      data: {
        userId: user.id,
        email: user.email,
      },
    }).save();

    await emailSender.send('resetPassword', user.email, { hash: action.hash });

    return {};
  }
}
