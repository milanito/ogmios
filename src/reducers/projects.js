import {
  SAVING_PROJECTS,
  CREATING_PROJECTS,
  FETCHING_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_FAILURE
} from '../actions/projects';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATING_PROJECTS:
      return { ...state, creating: true };
    case SAVING_PROJECTS:
      return { ...state, creating: false };
    case FETCHING_PROJECTS:
      return { ...state, fetching: true };
    case GET_PROJECTS:
      return { ...state, list: action.projects, fetching: false };
    case GET_PROJECTS_FAILURE:
      return { ...state, error: { projects: action.payload }, fetching: false };
    default:
      return state;
  }
}
