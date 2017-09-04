import {
  SAVING_USERS,
  CREATING_USERS,
  FETCHING_USERS,
  GET_USERS,
  GET_USERS_FAILURE
} from '../actions/users';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATING_USERS:
      return { ...state, creating: true };
    case SAVING_USERS:
      return { ...state, creating: false };
    case FETCHING_USERS:
      return { ...state, fetching: true };
    case GET_USERS:
      return { ...state, list: action.users, fetching: false };
    case GET_USERS_FAILURE:
      return { ...state, error: { users: action.payload }, fetching: false };
    default:
      return state;
  }
}


