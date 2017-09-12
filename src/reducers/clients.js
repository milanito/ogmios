import {
  CREATING_CLIENTS,
  SAVING_CLIENTS,
  FETCHING_CLIENTS,
  GET_CLIENTS,
  GET_CLIENTS_FAILURE
} from '../actions/clients';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATING_CLIENTS:
      return { ...state, creating: true };
    case SAVING_CLIENTS:
      return { ...state, creating: false };
    case FETCHING_CLIENTS:
      return { ...state, fetching: true, creating: false };
    case GET_CLIENTS:
      return { ...state, list: action.clients };
    case GET_CLIENTS_FAILURE:
      return { ...state, error: { clients: action.payload } };
    default:
      return state;
  }
}

