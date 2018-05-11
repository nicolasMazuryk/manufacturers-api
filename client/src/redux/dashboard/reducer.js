import { combineReducers } from 'redux';
import * as actions from './actions';

export default combineReducers({
  loading(state = false, action) {
    switch (action.type) {
      case actions.DASHBOARD_INFO_REQUEST:
        return true;
      case actions.DASHBOARD_INFO_SUCCESS:
      case actions.DASHBOARD_INFO_FAILURE:
        return false;
      default:
        return state;
    }
  },
  error(state = null, action) {
    switch (action.type) {
      case actions.DASHBOARD_INFO_FAILURE:
        return action.error;
      default:
        return state;
    }
  },
  tableTree(state = {}, action) {
    switch (action.type) {
      case actions.DASHBOARD_INFO_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },
});
