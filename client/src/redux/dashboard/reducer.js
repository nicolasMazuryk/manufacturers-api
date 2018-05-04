import { combineReducers } from 'redux';
import { PRODUCT_FIELDS } from '../../config';
import * as actions from './actions';

const DEFAULT_FIELDS_STATE = PRODUCT_FIELDS.reduce(
  (acc, { name }) => (acc[name] = { test: null }),
  {},
);

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

  fields(state = DEFAULT_FIELDS_STATE, action) {
    switch (action.type) {
      case actions.TEST_QUERY_SUCCESS:
        return {
          ...state,
          [action.data.fieldName]: {
            test: action.data.test,
          },
        };
      default:
        return state;
    }
  },
});
