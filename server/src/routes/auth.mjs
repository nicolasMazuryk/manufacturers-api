import { makeServiceRunner, runService, renderPromiseAsJson } from '../tools';

import AuthCreate from '../services/auth/Create';
import AuthRemove from '../services/auth/Remove';
import AuthCheck from '../services/auth/Check';

export default {
  create: makeServiceRunner(AuthCreate, req => req.body),

  remove: makeServiceRunner(AuthRemove, req => req.body),

  async check(req, res, next) {
    const promise = runService(AuthCheck, {
      params: { token: req.header('Authorization') },
    });

    try {
      req.user = await promise;

      return next();
    } catch (e) {
      return renderPromiseAsJson(req, res, promise);
    }
  },
};
