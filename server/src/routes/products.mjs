import { makeServiceRunner } from '../tools';

import Test from '../services/products/Test';
import BulkCreate from '../services/products/BulkCreate';

export default {
  test: makeServiceRunner(Test, req => req.body, req => req.db),
  bulkCreate: makeServiceRunner(BulkCreate, req => req.body, req => req.db),
};
