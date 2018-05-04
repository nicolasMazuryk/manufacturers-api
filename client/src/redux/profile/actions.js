export const prefix = 'profile';

export const PROFILE_REQUEST = `${prefix}/PROFILE_REQUEST`;
export const PROFILE_SUCCESS = `${prefix}/PROFILE_SUCCESS`;
export const PROFILE_FAILURE = `${prefix}/PROFILE_FAILURE`;

export const loadProfile = () => ({
  types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
  promise: api => api.auth.profile(),
});

export const LOGIN_REQUEST = `${prefix}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${prefix}/LOGIN_FAILURE`;

export const login = ({ email, password }) => ({
  types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
  promise: api => api.auth.login(email, password),
});

export const LOGOUT_REQUEST = `${prefix}/LOGOUT_REQUEST`;
export const LOGOUT_SUCCESS = `${prefix}/LOGOUT_SUCCESS`;
export const LOGOUT_FAILURE = `${prefix}/LOGOUT_FAILURE`;

export const logout = () => ({
  types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
  promise: api => api.auth.logout(),
});

export const CONNECT_TO_DB_REQUEST = `${prefix}/CONNECT_TO_DB_REQUEST`;
export const CONNECT_TO_DB_SUCCESS = `${prefix}/CONNECT_TO_DB_SUCCESS`;
export const CONNECT_TO_DB_FAILURE = `${prefix}/CONNECT_TO_DB_FAILURE`;

export const connectToDb = config => ({
  types: [CONNECT_TO_DB_REQUEST, CONNECT_TO_DB_SUCCESS, CONNECT_TO_DB_FAILURE],
  promise: api => api.dashboard.connectToDb(config),
});
