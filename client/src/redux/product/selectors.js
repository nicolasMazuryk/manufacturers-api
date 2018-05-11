import { prefix } from './actions';

export const fields = state => state[prefix].fields;
export const loading = state => state[prefix].loading;
export const error = state => state[prefix].error;
