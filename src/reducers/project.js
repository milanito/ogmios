import {
  SAVING_PROJECT,
  FETCHING_PROJECT,
  GET_PROJECT,
  GET_PROJECT_FAILURE
} from '../actions/project';

export default (state = {}, action) => {
  switch (action.type) {
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

