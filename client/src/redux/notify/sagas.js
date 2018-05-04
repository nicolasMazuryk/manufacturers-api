import { takeEvery } from 'redux-saga/effects';
import { PROFILE_FAILURE } from '../profile/actions';
import { notification } from 'antd';

const toString = obj =>
  Object.entries(obj)
    .map(([key, val]) => `${key}: ${val}`)
    .join(', ');

export function* notify() {
  yield takeEvery('*', function(action) {
    if (action.error && action.type !== PROFILE_FAILURE) {
      notification.error(
        {
          message: action.error.code,
          description: action.error.message || toString(action.error.fields),
        },
        7,
      );
    }

  });
  // yield takeEvery(userActions.ADD_SUCCESS, function(action) {
  //   message.success(`User ${action.data.email} successfyly added!`);
  // });
}
