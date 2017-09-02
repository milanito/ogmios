import {
  SAVING_KEYS,
  CREATING_KEYS,
  FETCHING_KEYS,
  GET_KEYS,
  GET_KEYS_FAILURE
} from '../actions/keys';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATING_KEYS:
      return { ...state, creating: true };
    case SAVING_KEYS:
      return { ...state, creating: false };
    case FETCHING_KEYS:
      return { ...state, fetching: true };
    case GET_KEYS:
      return { ...state, list: action.keys, fetching: false };
    case GET_KEYS_FAILURE:
      return { ...state, error: { keys: action.payload }, fetching: false };
    default:
      return state;
  }
}


