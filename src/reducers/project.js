import {
  GET_PROJECT,
  GET_PROJECT_FAILURE
} from '../actions/project';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return { ...state, item: action.project };
    case GET_PROJECT_FAILURE:
      return { ...state, error: { project: action.payload } };
    default:
      return state;
  }
}

