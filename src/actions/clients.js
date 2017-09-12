import axios from '../api';

export const SAVING_CLIENTS = 'SAVING_CLIENTS';
export const CREATING_CLIENTS = 'CREATING_CLIENTS';
export const FETCHING_CLIENTS = 'FETCHING_CLIENTS';
export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE';

export const fetchClients = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_CLIENTS });
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

export const clientsCreating = () => {
  return (dispatch) => {
    dispatch({ type: CREATING_CLIENTS });
  };
};

export const clientsSaving = () => {
  return (dispatch) => {
    dispatch({ type: SAVING_CLIENTS });
  };
};

export const clientsAdd = () => {
  return (dispatch) => {};
};

export const clientsRemove = () => {
  return (dispatch) => {};
};
