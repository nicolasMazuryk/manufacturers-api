import Base from '../Base';
import X from '../Exception';
import db from '../../db';
import { verify } from './authToken';
import status from 'http-status-codes';

const { User } = db.models;

export default class AuthCheck extends Base {
  static get validationRules() {
    return {
      token: ['required', 'token'],
    };
  }

  async execute({ token }) {
    try {
      const userData = await verify(token);

      const user = await User.findById(userData.id);

      if (!user) throw new Error('NOT_VALID_USER');

      return {
        id: user.id,
        role: user.role,
      };
    } catch (e) {
      throw new X({
        code: 'PERMISSION_DENIED',
        status: status.UNAUTHORIZED,
        fields: {
          token: 'WRONG_TOKEN',
        },
      });
    }
  }
}
