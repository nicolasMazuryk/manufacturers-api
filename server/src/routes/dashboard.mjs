import { makeServiceRunner, renderPromiseAsJson, runService } from '../tools';

import Connect from '../services/dashboard/Connect';
import Info from '../services/dashboard/Info';
import Check from '../services/dashboard/Check';

export default {
  connect: makeServiceRunner(Connect, req => req.body),

  info: makeServiceRunner(Info, () => ({}), req => req.db),

  async checkConnection(req, res, next) {
    const promise = runService(Check, {
      context: { ...req.user },
    });

    try {
      req.db = await promise;

      return next();
    } catch (e) {
      return renderPromiseAsJson(req, res, promise);
    }
  },
};
