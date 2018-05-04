import { put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CONNECT_TO_DB_SUCCESS,
  loadProfile,
} from './actions';

import { ROUTES } from '../../routes';

export function* loginSuccess(history, api) {
  yield takeEvery(LOGIN_SUCCESS, function*(action) {
    api.client.setToken(action.data.jwt);
    yield put(loadProfile());
    yield history.push(ROUTES.CONNECT);
  });
}

export function* logoutSuccess(history, api) {
  yield takeEvery(LOGOUT_SUCCESS, function() {
    api.client.removeToken();
    history.push(ROUTES.LOGIN);
    // window.location.reload();
  });
}

export function* connectDbSuccess(history, api) {
  yield takeEvery(CONNECT_TO_DB_SUCCESS, function() {
    api.client.setConnected(true);
    history.push(ROUTES.HOME);
  });
}

export function* profileSuccess() {}

export function* profileFailure() {}
