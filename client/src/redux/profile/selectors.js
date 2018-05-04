import { prefix } from './actions';

export const loading = state => state[prefix].loading;
export const user = state => state[prefix].user;
export const role = state => state[prefix].user && state[prefix].user.role;
export const isLoggedIn = state => !!state[prefix].user;
export const error = state => state[prefix].error;
