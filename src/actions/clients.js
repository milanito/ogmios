import axios from '../api';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE';

export const fetchClients = (token) => {
  return (dispatch) => {
    return axios
      .get('/api/clients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => dispatch({ type: GET_CLIENTS, clients: data }))
      .catch(({ data }) => dispatch({ type: GET_CLIENTS_FAILURE, payload: data }));
  };
};

export const clientsSaving = () => {
  return (dispatch) => {};
};

export const clientsCreating = () => {
  return (dispatch) => {};
};

export const clientsRemove = () => {
  return (dispatch) => {};
};
