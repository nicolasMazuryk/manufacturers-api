import { prefix } from './actions';

export const tableTree = state => state[prefix].tableTree;
export const loading = state => state[prefix].loading;
export const error = state => state[prefix].error;
