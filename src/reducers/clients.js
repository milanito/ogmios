import {
  GET_CLIENTS,
  GET_CLIENTS_FAILURE
} from '../actions/clients';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return { ...state, list: action.clients };
    case GET_CLIENTS_FAILURE:
      return { ...state, error: { clients: action.payload } };
    default:
      return state;
  }
}

