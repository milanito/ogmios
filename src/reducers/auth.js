import {
  AUTH_USER,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth';

export default (state = {}, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, token: action.token, role: action.role, error: {} };
    case LOGIN_FAILURE:
      return { ...state, error: { login: action.payload } };
    case LOGOUT:
      return { ...state, authenticated: false, token: null, role: null, error: {} };
    default:
      return state;
  }
}
