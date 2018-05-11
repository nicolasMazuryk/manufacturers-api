import { combineReducers } from 'redux';
import { PRODUCT_FIELDS } from '../../config';
import * as actions from './actions';

const DEFAULT_FIELDS_STATE = PRODUCT_FIELDS.reduce((acc, { name }) => {
  acc[name] = { test: null };
  return acc;
}, {});

export default combineReducers({
  loading(state = false, action) {
    switch (action.type) {
      case actions.TEST_QUERY_REQUEST:
      case actions.CREATE_PRODUCT_REQUEST:
        return true;
      case actions.TEST_QUERY_SUCCESS:
      case actions.TEST_QUERY_FAILURE:
      case actions.CREATE_PRODUCT_SUCCESS:
      case actions.CREATE_PRODUCT_FAILURE:
        return false;
      default:
        return state;
    }
  },
  error(state = null, action) {
    switch (action.type) {
      case actions.TEST_QUERY_FAILURE:
      case actions.CREATE_PRODUCT_FAILURE:
        return action.error;
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
            name: action.data.fieldName,
            test: action.data.test,
          },
        };
      default:
        return state;
    }
  },
});
