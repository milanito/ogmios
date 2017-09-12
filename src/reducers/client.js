import {
  FETCHING_CLIENT,
  GET_CLIENT,
  GET_CLIENT_FAILURE
} from '../actions/client';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCHING_CLIENT:
      return { ...state, fetching: true, creating: false };
    case GET_CLIENT:
      return { ...state, item: action.client, fetching: false };
    case GET_CLIENT_FAILURE:
      return { ...state, error: { client: action.payload }, fetching: false };
    default:
      return state;
  }
}


