import { REHYDRATE } from 'redux-persist/constants'

import {
  AUTH_USER,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth';

export default (state = { rehydrated: false }, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, token: action.token,
        role: action.role, email: action.email, userid: action.userid, error: {} };
    case LOGIN_FAILURE:
      return { ...state, error: { login: action.payload } };
    case LOGOUT:
      return { ...state, authenticated: false, token: null, role: null,
        email: null, error: {} };
    case REHYDRATE:
      return { ...state, ...action.payload.auth, rehydrated: true }
    default:
      return state;
  }
}
