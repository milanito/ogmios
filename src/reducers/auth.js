import {
  AUTH_USER,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth';

export default (state = {}, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, error: {} };
    case LOGIN_FAILURE:
      return { ...state, error: { login: action.payload } };
    case LOGOUT:
      return { ...state, authenticated: false, error: {} };
    default:
      return state;
  }
}
