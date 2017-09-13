import {
  SAVING_USER,
  FETCHING_USER,
  GET_USER,
  GET_USER_FAILURE
} from '../actions/user';

export default (state = {}, action) => {
  switch (action.type) {
    case SAVING_USER:
      return { ...state, creating: false };
    case FETCHING_USER:
      return { ...state, fetching: true };
    case GET_USER:
      return { ...state, item: action.user, fetching: false };
    case GET_USER_FAILURE:
      return { ...state, error: { user: action.payload }, fetching: false };
    default:
      return state;
  }
}
