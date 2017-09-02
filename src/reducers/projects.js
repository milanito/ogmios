import {
  GET_PROJECTS,
  GET_PROJECTS_FAILURE
} from '../actions/projects';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, list: action.projects };
    case GET_PROJECTS_FAILURE:
      return { ...state, error: { projects: action.payload } };
    default:
      return state;
  }
}
