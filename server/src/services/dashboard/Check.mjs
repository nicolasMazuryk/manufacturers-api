import Base from '../Base';
import dbManager from '../dbManager';
import X from '../Exception';
import status from 'http-status-codes';

export default class CheckConnection extends Base {
  async execute() {
    const connection = dbManager.getConnection(this.context.id);

    if (!connection) {
      throw new X({
        code: 'CONNECTION_NOT_FOUND',
        status: status.NOT_FOUND,
        fields: {
          connected: 'NOT_CONNECTED',
        },
      });
    }

    return { connection };
  }
}
