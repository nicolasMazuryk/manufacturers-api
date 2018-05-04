import { all } from 'redux-saga/effects';

import {
  loginSuccess,
  logoutSuccess,
  profileSuccess,
  profileFailure,
  connectDbSuccess,
} from './profile/sagas';
import { notify } from './notify/sagas';

export default function* rootSaga(history, api) {
  yield all([
    loginSuccess(history, api),
    logoutSuccess(history, api),
    profileSuccess(history),
    profileFailure(history),
    connectDbSuccess(history, api),
    notify(),
  ]);
}
