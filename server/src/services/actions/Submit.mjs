import Base from '../Base';
import X from '../Exception';
import db from '../../db';
// import { dumpUser } from '../utils';
import emailSender from '../emailSender';
import status from 'http-status-codes';

const { Action } = db.models;

export default class ActionsSubmit extends Base {
  async validate(data) {
    const action = await Action.findOne({
      where: { hash: data.hash, deletedAt: null },
    });
    if (!action) {
      throw new X({
        code: 'NOT_FOUND',
        status: status.NOT_FOUND,
        fields: {
          hash: 'INVALID',
        },
      });
    }

    const rulesRegistry = {
      resetPassword: {
        password: 'required',
        confirmPassword: ['required', { equal_to_field: ['password'] }],
      },

      confirmEmail: {},
    };

    return this.doValidation(data, {
      ...rulesRegistry[action.type],
      hash: ['required'],
    });
  }

  async execute(data) {
    const action = await Action.findOne({
      where: { hash: data.hash, deletedAt: null },
    });

    await action.run(data);
    await action.destroy();

    if (action.type === 'resetPassword') {
      await emailSender.send('resetPasswordSuccess', action.data.email);
      return {};
    } else if (action.type === 'confirmEmail') {
      return {};
    }

    return {};
  }
}
