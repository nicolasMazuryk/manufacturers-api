import { makeServiceRunner } from '../tools';

import Test from '../services/products/Test';

export default {
  test: makeServiceRunner(Test, req => req.body, req => req.db),
};
