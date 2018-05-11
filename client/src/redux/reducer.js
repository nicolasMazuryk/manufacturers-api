import { combineReducers } from 'redux';

import profile from './profile/reducer';
import form from './forms/reducer';
import router from './router/reducer';
import dashboard from './dashboard/reducer';
import product from './product/reducer';

export default combineReducers({
  profile,
  router,
  form,
  dashboard,
  product,
});
