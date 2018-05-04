import { combineReducers } from 'redux';
import * as actions from './actions';

export default combineReducers({
  loading(state = false, action) {
    switch (action.type) {
      case actions.PROFILE_REQUEST:
      case actions.LOGIN_REQUEST:
      case actions.LOGOUT_REQUEST:
      case actions.CONNECT_TO_DB_REQUEST:
        return true;
      case actions.PROFILE_SUCCESS:
      case actions.PROFILE_FAILURE:
      case actions.LOGIN_SUCCESS:
      case actions.LOGIN_FAILURE:
      case actions.LOGOUT_SUCCESS:
      case actions.LOGOUT_FAILURE:
      case actions.CONNECT_TO_DB_SUCCESS:
      case actions.CONNECT_TO_DB_FAILURE:
        return false;
      default:
        return state;
    }
  },
  user(state = null, action) {
    switch (action.type) {
      case actions.PROFILE_SUCCESS:
        return action.data;
      case actions.LOGOUT_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },
  error(state = null, action) {
    switch (action.type) {
      case actions.LOGIN_FAILURE:
      case actions.LOGOUT_FAILURE:
        return action.error;
      default:
        return state;
    }
  },
});
