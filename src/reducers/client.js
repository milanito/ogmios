import {
  GET_CLIENT,
  GET_CLIENT_FAILURE
} from '../actions/client';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CLIENT:
      return { ...state, item: action.client };
    case GET_CLIENT_FAILURE:
      return { ...state, error: { client: action.payload } };
    default:
      return state;
  }
}


