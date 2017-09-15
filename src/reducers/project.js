import {
  SAVING_PROJECT,
  SAVING_PROJECT_USER,
  FETCHING_PROJECT,
  FETCHING_PROJECT_USERS,
  GET_PROJECT,
  GET_PROJECT_USERS,
  GET_PROJECT_FAILURE,
  GET_PROJECT_USERS_FAILURE,
} from '../actions/project';

export default (state = {}, action) => {
  switch (action.type) {
    case SAVING_PROJECT_USER:
      return { ...state, creatingUser: true };
    case FETCHING_PROJECT_USERS:
      return { ...state, fetchingUser: true, creatingUser: false };
    case GET_PROJECT_USERS:
      return { ...state, users: action.users, fetching: false };
    case GET_PROJECT_USERS_FAILURE:
      return { ...state, error: { project: action.payload, fetching: false } };
    case SAVING_PROJECT:
      return { ...state, creating: true };
    case FETCHING_PROJECT:
      return { ...state, fetching: true, creating: false };
    case GET_PROJECT:
      return { ...state, item: action.project, fetching: false };
    case GET_PROJECT_FAILURE:
      return { ...state, error: { project: action.payload, fetching: false } };
    default:
      return state;
  }
}

